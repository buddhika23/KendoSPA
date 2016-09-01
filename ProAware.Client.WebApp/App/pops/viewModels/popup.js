define(
    [
        'jquery',
        'kendo',
        'i18n!translate/nls/controlPointAddEdit',
        'toastr',
        'Common/spinJsPop',
        'Common/httpUtils',
        'Common/enums'
    ],
    function ($, kendo, lan, toastr, spin, httpUtils, enums) {

        var baseUrl = window.location.protocol + '//' + window.location.host + '/api/';


        var userDataSource = new kendo.data.DataSource({
            schema: {
                id: 'Id'
            },
            transport: {
                read: {
                    url: baseUrl + 'common/masterdata/users',
                    dataType: 'json'
                }
            }
        });

        var areasDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: function () {
                        if (typeof viewModel.selectedRow.TemplateId !== "undefined" || viewModel.selectedRow.TemplateId !== 0)
                            return baseUrl + 'ControlPointAreas/template/' + viewModel.selectedRow.TemplateId;
                        else
                            return "";
                    },
                    dataType: 'json',
                    complete: function () {
                    }
                }
            }
        });

        var viewModel = kendo.observable({
            isAdmin: true,
            sliderName: '',
            formTitle: '',
            selectedRow: {},
            mode: '',
            canSetPeriod: false,
            isInReadOnlyMode: false,
            validator: null,
            controlPointLogCount: lan.NoLogs,
            isInitialized: false,
            scheduleList: new kendo.data.DataSource({
                transport: {
                    read: {
                        url: baseUrl + 'Enum?type=RecurrencePeriodType',
                        dataType: 'json'
                    }
                }
            }),
            statuList: new kendo.data.DataSource({
                transport: {
                    read: {
                        url: baseUrl + 'Enum?type=ControlPointStatus',
                        dataType: 'json'
                    }
                }
            }),
            controlPointInstances: new kendo.data.DataSource({
                transport: {
                    read: {
                        url: function () {
                            if (viewModel.selectedRow.Id) {
                                return baseUrl + 'ControlPointInstance?controlPointId=' + viewModel.selectedRow.Id;
                            } else {
                                return "";
                            }
                        },
                        dataType: 'json'
                    }
                }
            }),
            userCollection: function () {
                return userDataSource;
            },
            areasList: new kendo.data.DataSource({
                transport: {
                    read: {
                        url: function () {
                            if (typeof viewModel.selectedRow.TemplateId !== "undefined" || viewModel.selectedRow.TemplateId !== 0)
                                return baseUrl + 'ControlPointAreas/template/' + viewModel.selectedRow.TemplateId;
                            else
                                return "";
                        },
                        dataType: 'json',
                        complete: function () {
                        }
                    }
                }
            }),
            onStatusChange: function (e) {
                var item = e.sender.dataItem(e.sender.select());
                this.set('selectedRow.StatusId', item.Id);
            },

            validateDueInMonths: function () {
                var selectedRow = this.get('selectedRow');
                if ((typeof selectedRow !== "undefined" && selectedRow !== null && selectedRow.ScheduleId !== 0 && typeof selectedRow.DueInMonths === "undefined")) {
                    this.set('showDueMonthListValidation', true);
                    $('#spanShowDueMonthListValidation').show();

                } else {
                    this.set('showDueMonthListValidation', false);
                    $('#spanShowDueMonthListValidation').hide();
                }
            },
            onSave: function () {
                var observableThis = this;
                var selectedRow = this.get('selectedRow');
                if (this.validator.validate() && (selectedRow.ScheduleId === 0 || typeof selectedRow.DueInMonths !== "undefined")) {
                    var data = this.get('selectedRow');
                    //if (typeof selectedRow.AreaId !== "number") {
                    //    this.validator.validate();
                    //    toastr.warning(lan.PleaseSelectAValidArea);
                    //    return false;
                    //}
                    var type;
                    var url;
                    var successMessage;

                    var mode = this.get('mode');

                    if (mode.toLowerCase() === 'add' || mode.toLowerCase() === 'fileAdd') {
                        type = 'POST';
                        url = baseUrl + 'controlpoints';
                        successMessage = lan.MsgControlPointCreated;
                    } else if (mode.toLowerCase() === 'edit') {
                        type = 'PUT';
                        data.Id = this.get('selectedRow').Id;
                        url = baseUrl + 'controlpoints?id=' + this.get('selectedRow').Id;
                        successMessage = lan.MsgControlPointEdited;
                    } else if (mode.toLowerCase() === 'duplicate') {
                        data.assignedToUserId = null;
                        data.statusId = 0;
                        data.IsDuplicating = true;
                        data.ParentId = data.Id;
                        type = 'POST';
                        url = baseUrl + 'controlpoints';
                        successMessage = lan.MsgControlPointHasBeenDuplicatedWithDefaults;
                    } else {
                        console.log('mode not set');
                        return false;
                    }

                    var promise = $.ajax({
                        url: url,
                        type: type,
                        data: JSON.stringify(data),
                        async: true,
                        beforeSend: function (xhr) {
                            setHeader(xhr);
                            var divControlPointContainer = $('#divControlPointContainer');
                            spin.start(divControlPointContainer);
                        },
                        success: function (e) {
                            if (observableThis.get('mode') === 'add') {
                                observableThis.set('newControlPointId', e.Result);
                                var s = observableThis.get('newControlPointId');
                                data.Id = e.Result;
                                console.log(s);
                            } else if (observableThis.get('mode') === 'fileAdd') {
                                observableThis.set('newControlPointId', e.Result);
                                $.publish('openFilePopup', { name: 'fileManager', ownerId: e.Result, typeId: 0, showUpload: true, showRemove: true, showReplace: true, showDownload: true });
                                $('.k-upload').addClass('upload-alignment');
                                data.Id = e.Result;
                            }
                            $.publish('controlpointSaveCompleted', true);
                            toastr.options.positionClass = 'toast-bottom-left';
                            toastr.success(successMessage);
                            spin.stop();
                            if (observableThis.get('mode') !== 'fileAdd') {
                                // $.publish('closePopup', 'controlPointAddEdit');
                            } else {
                                observableThis.set('mode', 'edit');
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            toastr.options.positionClass = 'toast-bottom-left';
                            toastr.error(lan.MsgErrorOccuredPleaseTryAgain);
                            spin.stop();
                        }
                    });

                    return promise;
                } else {
                    //this.set('showDueMonthListValidation', true);
                    //$('#spanShowDueMonthListValidation').show();
                    this.validateDueInMonths();
                    return false;
                }

            },
            onCancel: function () {
                $('#inDuemonthSection').hide();
                this.set('showDueMonthLis', false);
                $.publish('closePopup', 'controlPointAddEdit');
                this.set('isAttachmentSaveCall', false);
            },
            processFocus: function () {
                if (!this.isInReadOnlyMode) {
                    $.publish('openPopup', { name: 'processSearch', returnCommand: 'OnCPProcessSearchSelection' });
                }
            },
            departmentFocus: function () {
                if (!this.isInReadOnlyMode) {
                    $.publish('openPopup', { name: 'departmentSearch', returnCommand: 'OnDepartmentCPSearchSelection' });
                }
            },

            onAreaChange: function () {

            },

            showDueMonthListValidation: false,
            dueMonthList: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
            isDueVisible: false,

            onScheduleChange: function (e) {
                var selectedRow = this.get('selectedRow');
                var s = e.sender.dataItem(e.sender.select()).Id;
                if (s === 0) {
                    this.set('isDueVisible', false);
                    this.set('showDueMonthListValidation', false);
                } else {
                    if (s !== 0 && typeof selectedRow.DueInMonth === "undefined") {
                        this.set('showDueMonthListValidation', true);
                    } else {
                        this.set('showDueMonthListValidation', false);
                    }
                    this.set('isDueVisible', true);
                }
                this.set('selectedPeriod', s);

                switch (s) {
                    case 1:
                        this.set('selectedRow.DueInMonths', '1');
                        this.set('selectedDueInMonths', 1);
                        this.set('isSemiAnnualVisible', true);
                        this.set('isQuaterVisible', false);
                        this.set('isMonthVisible', false);
                        //var numericTb = $('#dropDownDuemonths1').data('kendoNumericTextBox');
                        //numericTb.max = 2;
                        //numericTb.min = 0;
                        //numericTb.value = this.selectedRow.DueInMonths;
                        //numericTb.refresh();
                        //var ntb = $('#dropDownDuemonths1').data("kendoNumericTextBox");
                        //ntb.destroy();
                        //$('#dropDownDuemonths1').html("");
                        //$('#dropDownDuemonths1').kendoNumericTextBox({
                        //    min: 0,
                        //    max: 2
                        //});
                        break;
                    case 2:
                        this.set('selectedRow.DueInMonths', '2');
                        this.set('isSemiAnnualVisible', false);
                        this.set('isQuaterVisible', true);
                        this.set('isMonthVisible', false);

                        //this.set('selectedDueInMonths', 2);
                        //var numericTb = $('#dropDownDuemonths1').data('kendoNumericTextBox');
                        //numericTb.max = 5;
                        //numericTb.min = 0;
                        //numericTb.value = this.selectedRow.DueInMonths;


                        //$('#dropDownDuemonths1').html("");
                        //$('#dropDownDuemonths1').kendoNumericTextBox({
                        //    min: 0,
                        //    max: 5
                        //});
                        break;
                    case 3:
                        this.set('selectedRow.DueInMonths', '3');
                        this.set('isSemiAnnualVisible', false);
                        this.set('isQuaterVisible', false);
                        this.set('isMonthVisible', true);

                        //this.set('selectedDueInMonths', 3);
                        //var numericTb = $('#dropDownDuemonths1').data('kendoNumericTextBox');
                        //numericTb.max = 11;
                        //numericTb.min = 0;
                        //numericTb.value = this.selectedRow.DueInMonths;


                        //$('#dropDownDuemonths1').html("");
                        //$('#dropDownDuemonths1').kendoNumericTextBox({
                        //    min: 0,
                        //    max: 11
                        //});
                        break;
                    default:
                        break;
                }

                this.numericChangeTriggers();
                this.rangeList.read();
                this.getDueMonths();
            },
            affectedMonths: '',
            selectedPeriod: 0,
            selectedDueInMonths: 0,
            numericChangeTriggers: function () {

            },

            rangeList: new kendo.data.DataSource({
                transport: {
                    read: {
                        url: function () {
                            if (typeof viewModel.selectedDueInMonths !== "undefined") {
                                return baseUrl + 'controlpoints/schedule-start-ranges/' + viewModel.selectedPeriod + '/' + viewModel.selectedDueInMonths;
                            }
                            else {
                                return "";
                            }
                        },
                        dataType: 'json'
                    }
                },
                change: function () {
                    if (viewModel.selectedRow.SchedulerStartDate) {
                        $.map(viewModel.rangeList.data(), function (obj, index) {
                            if (obj.indexOf(viewModel.selectedRow.SchedulerStartDate) > -1) {
                                viewModel.set('selectedRow.SchedulerStartDate', viewModel.rangeList.data()[index]);
                                return index;
                            }
                            return index;
                        });
                    }
                }
            }),

            getDueMonths: function () {
                if (typeof viewModel.selectedPeriod !== "undefined" && typeof viewModel.selectedDueInMonths !== "undefined") {
                    httpUtils.get(baseUrl + 'controlpoints/schedule-due-months/' + viewModel.selectedPeriod + '/' + viewModel.selectedDueInMonths)
                        .done(function (data) {
                            viewModel.set('affectedMonths', data);
                        });
                }
            },

            onSchedulePeriodDataBound: function () {
                if (viewModel.selectedRow.SchedulerStartDate) {
                    $.map(viewModel.rangeList.data(), function (obj, index) {
                        if (obj.indexOf(viewModel.selectedRow.SchedulerStartDate) > -1) {
                            viewModel.set('selectedRow.SchedulerStartDate', viewModel.rangeList.data()[index]);
                            return index;
                        }
                        return index;
                    });
                }
                this.getDueMonths();
            },


            // Attachment
            attachmentFocus: function () {
                var selectedRow = this.get('selectedRow');
                var isInReadOnlyMode = this.isInReadOnlyMode;
                if (typeof selectedRow === "undefined" || selectedRow === null || typeof selectedRow.Id === "undefined" || selectedRow.Id === null) {
                    this.save();
                    this.set('mode', 'fileAdd');
                } else {
                    $.publish('openFilePopup', { name: 'fileManager', ownerId: selectedRow.Id, typeId: 0, showUpload: !isInReadOnlyMode, showRemove: !isInReadOnlyMode, showReplace: !isInReadOnlyMode, showDownload: true });
                }
            },

            getAttachmentCount: function () {
                var observableThis = this;
                var selectedRow = this.get('selectedRow');
                if (selectedRow !== null && typeof selectedRow !== "undefined" && typeof selectedRow.Id !== "undefined") {
                    var inputDto = {
                        typeId: 0,
                        ownerId: selectedRow.Id,
                        isCount: true
                    };
                    $.ajax({
                        url: baseUrl + 'Attachment',
                        type: 'GET',
                        data: inputDto,
                        async: true,
                        beforeSend: function (xhr) {
                            setHeader(xhr);
                        },
                        success: function (data) {
                            if (data === 0) {
                                observableThis.set('attachmentCount', lan.NoAttachment);
                            } else if (data === 1) {
                                observableThis.set('attachmentCount', data + ' ' + lan.Attachments);
                            } else {
                                observableThis.set('attachmentCount', data + ' ' + lan.Attachments);
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            toastr.error(JSON.parse(error.responseText).Message);
                            return 0;
                        }
                    });
                }
            },

            //User logs
            onShowUserLogs: function () {
                var selectedRow = this.get('selectedRow');
                var isInReadOnlyMode = this.get('isInReadOnlyMode');

                if (selectedRow.Id > 0) {
                    $.publish('openPopup', {
                        name: 'logManager',
                        returnCommand: 'onUserLogClosed',
                        args: {
                            moduleId: enums.userModule.ControlPoint,
                            ownerId: selectedRow.Id,
                            isInReadOnlyMode: isInReadOnlyMode,
                            panelIncreaseCommand: 'onIncreaseIncidentPanelWidth'
                        }
                    });
                    $('#' + this.formName()).css('z-index', +$('#' + this.formName()).css("z-index") - 5);
                    $('#' + this.panelName()).css('z-index', +$('#' + this.panelName()).css("z-index") - 5);
                }
            },

            getUserLogCount: function () {
                var observableThis = this;
                var ownerId = this.selectedRow.Id;
                var typeId = enums.userModule.Incident;
                if (ownerId !== null && typeof ownerId !== "undefined") {
                    $.ajax({
                        url: baseUrl + 'common/userlogs/count/module/' + typeId + '/owner/' + ownerId,
                        type: 'GET',
                        async: true,
                        beforeSend: function (xhr) {
                            setHeader(xhr);
                        },
                        success: function (data) {
                            if (data === 0) {
                                observableThis.set('controlPointLogCount', lan.NoLogs);
                            } else {
                                observableThis.set('controlPointLogCount', data + ' ' + lan.Logs);
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            toastr.error(JSON.parse(error.responseText).Message);
                            return 0;
                        }
                    });
                }
            },

            reset: function () {
                this.set('isInReadOnlyMode', viewModel.externalArgs.isInReadOnlyMode);
                this.set('mode', viewModel.externalArgs.mode);

                if (this.get('mode') === 'Add') {
                    this.set('selectedRow.IsClientQuestionsVisible', true);
                }

                this.set('formTitle', viewModel.externalArgs.formTitle);
                this.set('hasId', viewModel.externalArgs.hasId);
                var row = this.selectedRow;
                this.set('selectedPeriod', row.ScheduleId);
                this.set('selectedDueInMonths', row.DueInMonths ? row.DueInMonths : 0);
                viewModel.rangeList.read();
                viewModel.areasList.read();
                viewModel.getAttachmentCount();
                viewModel.getUserLogCount();
                var selectedPeriod = this.selectedRow.ScheduleId;
                if (selectedPeriod === 0) {
                    this.set('isDueVisible', false);
                    this.set('showDueMonthListValidation', false);
                } else {
                    if (selectedPeriod !== 0 && typeof this.selectedRow.DueInMonth === "undefined") {
                        this.set('showDueMonthListValidation', true);
                    } else {
                        this.set('showDueMonthListValidation', false);
                    }
                    this.set('isDueVisible', true);
                }

                if (this.hasId) {
                    spin.start(this.formName());
                    httpUtils.get(baseUrl + 'ControlPoints/' + row.Id + '/has-instances')
                        .done(function (result) {
                            if (result) {
                                viewModel.set('canSet', false);
                            } else {
                                viewModel.set('canSet', true);
                            }

                            if (viewModel.mode === 'detail') {
                                viewModel.set('canSet', false);
                            }
                            spin.stop();
                        })
                        .fail(function (error) {
                            console.log(error);
                            spin.stop();
                        });
                } else {
                    this.set('canSet', true);
                    this.set('isDueVisible', false);

                }

                $('#inDuemonthSection > div > span.k-widget.k-numerictextbox > span > span')
                    .on('click', function () {
                        var currentValue = $('#dropDownDuemonths1').val();
                        viewModel.set('selectedDueInMonths', currentValue);
                        viewModel.rangeList.read();
                        viewModel.getDueMonths();
                    });


                $('#inDuemonthSection2 > span.k-widget.k-numerictextbox > span > span')
                    .on('click', function () {
                        var currentValue = $('#dropDownDuemonths2').val();
                        viewModel.set('selectedDueInMonths', currentValue);
                        viewModel.rangeList.read();
                        viewModel.getDueMonths();
                    });


                $('#inDuemonthSection3 > span.k-widget.k-numerictextbox > span > span')
                    .on('click', function () {
                        var currentValue = $('#dropDownDuemonths3').val();
                        viewModel.set('selectedDueInMonths', currentValue);
                        viewModel.rangeList.read();
                        viewModel.getDueMonths();
                    });
                setTimeout(function () {
                    $.each($('textarea'), function () {
                        var offset = this.offsetHeight - this.clientHeight;

                        $(this).css('height', 'auto').css('height', this.scrollHeight + offset);

                    });
                }, 100);

            },

            setupUI: function () {
                this.set('selectedRow', viewModel.externalArgs.selectedRow);

                viewModel.validator = $('#controlPointAddEditForm').kendoValidator(
                {
                    rules: {
                        ComboMatch: function (input) {
                            var role = input.data('role');
                            if (role === 'combobox' && input.is("[required]")) {
                                var combobox = $('#' + input[0].id).data('kendoComboBox');
                                return combobox.selectedIndex !== -1;
                            }

                            return true;
                        },
                    },
                    messages: {
                        ComboMatch: lan.InvalidValue,
                        matches: function (input) {
                            return input.data("matchesMsg");
                        }
                    }
                }).data("kendoValidator");
                return true;
            },

            formName: function () {
                return viewModel.get('sliderName') + 'Form';
            },

            panelName: function () {
                return viewModel.get('sliderName') + 'Panel';
            }
        });
        viewModel.bind("change", function (e) {
            console.log(e.field); // will output the field name when the event is raised
        });

        $.subscribe('refreshAttachmentCount', function () {
            if (typeof viewModel !== "undefined" && viewModel !== null) {
                viewModel.getAttachmentCount();
            }
        });

        $.subscribe('OnCPProcessSearchSelection', function (sender, commandArgs) {
            var selected = commandArgs.selected;
            if (typeof selected !== "undefined" && selected !== null && selected.Name !== "") {
                viewModel.set('selectedRow.ProcessName', selected.Name);
                viewModel.set('selectedRow.ProcessId', selected.Id);
            }
        });

        $.subscribe('OnDepartmentCPSearchSelection', function (sender, commandArgs) {
            var selected = commandArgs.selected;
            if (typeof selected !== "undefined" && selected !== null && selected.Name !== "") {
                viewModel.set('selectedRow.DepartmentName', selected.Name);
                viewModel.set('selectedRow.DepartmentId', selected.Id);
                viewModel.validator.validate();
            }
        });

        $.subscribe('refreshAttachmentCount', function () {
            viewModel.getAttachmentCount();
        });

        $.subscribe('onUserLogClosed', function () {
            viewModel.getUserLogCount();
            $('#' + viewModel.formName()).width(+$('#' + viewModel.formName()).width() - 32);
            $('#' + viewModel.formName()).css('z-index', +$('#' + viewModel.formName()).css("z-index") + 5);
            $('#' + viewModel.panelName()).css('z-index', +$('#' + viewModel.panelName()).css("z-index") + 5);

        });


        $.subscribe('onIncreaseIncidentPanelWidth', function () {
            $('#' + viewModel.formName()).width(+$('#' + viewModel.formName()).width() + 32);
        });



        return viewModel;

    });


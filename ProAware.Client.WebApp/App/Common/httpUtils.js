define(
    [],
    function () {
        var http = {};

        http.setHeader = function(xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Content-Type', 'application/json');
        };

        http.sendDataPromise = function(url, mode, objectToSave) {
            if (mode === 'PUT' || mode === 'DELETE') {
                url = url + objectToSave.Id;
            }

            return $.ajax({
                url: url,
                type: mode,
                data: JSON.stringify(objectToSave),
                async: true,
                beforeSend: function(xhr) {
                    http.setHeader(xhr);
                }
            });
        };

        http.get = function(url) {
            return $.ajax({
                url: url,
                type: 'GET',
                async: true,
                beforeSend: function (xhr) {
                    http.setHeader(xhr);
                },
                error: function (error) {
                    console.log('Communication error: ', error);
                }
            });
        };
        
        http.handleError = function (error) {
            if (error.statusCode === 403) {
                //forbidden
            }
        };

        return http;

    });
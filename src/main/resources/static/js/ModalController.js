/*******************************************************************************
 * Copyright 2016 Sparta Systems, Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/

(function () {
    'use strict';

    angular.module('HoldMailApp')

        .controller('ModalCtrl', ['$scope', '$uibModalInstance', 'growl', 'MessageService',
            function ($scope, $uibModalInstance, growl, MessageService) {

                var modalCtrl = this;

                $scope.message = $uibModalInstance.message;

                // referenced in the iframe for the HTML view tab
                $scope.messageHTMLURL = MessageService.getMessageHTMLURI($scope.message.messageId);

                modalCtrl.close = function () {
                    $uibModalInstance.close();
                };

                modalCtrl.forwardMail = function () {

                    var messageId = $scope.message.messageId;
                    var recipient = $scope.forwardRecipient;

                    MessageService.forwardMessage(messageId, recipient)
                        .then(function () {
                            growl.success('Mail ' + messageId + ' successfully sent to <b>' + recipient + '</b>', {});

                        },function () {
                            growl.error("The server rejected the request (it probably didn't like that email address " +
                                "- see the logs for more info).", {});
                        });

                }

            }]);

}());

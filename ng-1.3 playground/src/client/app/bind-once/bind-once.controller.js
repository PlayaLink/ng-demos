(function () {
    'use strict';

    angular
        .module('app.bind-once')
        .controller('BindOnce', BindOnce);

    /* @ngInject */
    function BindOnce(dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;
        var newId = 0;

        vm.addAvenger = addAvenger;
        vm.refresh = refresh;
        vm.maa;
        vm.title = 'BindOnce';

        activate();

        function activate() {
            return getAvengers().then(function() {
                logger.info('Activated BindOnce View');
            });
        }

        function addAvenger() {
            newId++;
            vm.maa.push({
                "id": newId,
                "name": "Ant Man",
                "description": "Coming soon ..."
            });
        }

        function refresh() {
            // refresh and test bind once by changing some values
            return dataservice.getAvengers().then(function (data) {
                // "track by" option will keep the bindings there, so bindonce will stay
//                vm.maa = data.data[0].data.results;
                vm.maa = data;
                vm.maa[0].name = 'John Papa';
                vm.maa.push({name: 'Ward Bell', description: 'super hero'})
                return vm.maa;
            });
        }

        function getAvengers() {
            return dataservice.getAvengers().then(function (data) {
                vm.maa = data;
                return vm.maa;
            });
        }
    }
})();
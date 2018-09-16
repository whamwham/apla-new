(function(){

angular.module('app').directive('a', links);

function links(){
	return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if(attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
   };
}

})();
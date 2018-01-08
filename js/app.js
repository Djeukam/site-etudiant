var app = angular.module('myApp',['storageService']);
app.controller('formController', ['$scope', 'getLocalStorage',function($scope, getLocalStorage){
    $scope.listeEtudiant = getLocalStorage.getEtudiant();
    $scope.etudiant = {};
    $scope.masculin = true;
    $scope.feminin = false;
    $scope.etumodif = {};
    $scope.masculinModif = true;
    $scope.femininModif = false;
    $scope.listeSupprimer = [];
    var index;

    $scope.RadioChange = function(num){
        if(num == 1){
            $scope.masculin = true;
            $scope.feminin = false;
            $scope.etudiant.sexe = 'M';
        }
        else if(num == 2){
            $scope.masculin = false;
            $scope.feminin = true;
            $scope.etudiant.sexe = 'F';
        }

    };$scope.RadioChangemodif = function(num){
        if(num == 1){
            $scope.masculinModif = true;
            $scope.femininModif = false;
            $scope.etumodif.sexe = 'M';
        }
        else if(num == 2){
            $scope.masculinModif = false;
            $scope.femininModif = true;
            $scope.etumodif.sexe = 'F';
        }

    };
    $scope.addNew = function(){
        $scope.listeEtudiant.push($scope.etudiant);
        getLocalStorage.updateEtudiant($scope.listeEtudiant);
        $scope.etudiant = {};
        $scope.RadioChange(1);
    };

    $scope.edit = function (student, indice) {
        console.log(student);
        $scope.etumodif.nom = student.nom;
        $scope.etumodif.prenom = student.prenom;
        $scope.etumodif.age = student.age;
        if(student.sexe == 'M'){
            $scope.RadioChangemodif(1);
        }
        else if(student.sexe == 'F'){
            $scope.RadioChangemodif(2);
        }
        index = indice;
    };
    $scope.modifier = function(){
        $scope.listeEtudiant[index].nom = $scope.etumodif.nom;
        $scope.listeEtudiant[index].prenom = $scope.etumodif.prenom;
        $scope.listeEtudiant[index].sexe = $scope.etumodif.sexe;
        $scope.listeEtudiant[index].age = $scope.etumodif.age;
        $scope.etumodif = {};
        $scope.RadioChangemodif(1);
    };
    $scope.supprimer = function(ind){
        $scope.listeSupprimer.push($scope.listeEtudiant[ind]);
        getLocalStorage.updateEtudiant($scope.listeEtudiant);
        $scope.listeEtudiant.splice(ind);
    };


}]);
var storageService = angular.module('storageService', []);
storageService.factory('getLocalStorage', function () {
    var etudiantList = {};
    return {
        list: etudiantList,
        updateEtudiant: function (EtudiantArr) {
            if (window.localStorage && EtudiantArr) {
                //Local Storage to add Data
                localStorage.setItem("listeEtudaint", angular.toJson(EtudiantArr));
            }
            etudiantList = etudiantList;

        },
        getEtudiant: function () {
            //Get data from Local Storage
            etudiantList = angular.fromJson(localStorage.getItem("listeEtudiant"));
            return etudiantList ? etudiantList : [];
        }
    };

});





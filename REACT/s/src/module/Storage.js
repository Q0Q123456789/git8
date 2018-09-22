

var storage={

    set:function(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },

    get:function(key){

        return JSON.parse(localStorage.getItem(key));

    },

    hasCollect:function(aid,collectStorageData){


               for(var i=0;i<collectStorageData.length;i++){

                    if(aid==collectStorageData[i].aid){

                        return true;  /*已经收藏*/
                    }


               }

               return false;  /*没有收藏*/
        
    }

}

export default storage;



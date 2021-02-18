export default {
                    //ESTA FUNCION NOS SIRVE PARA CREAR UN TEXTO 
    creartexto(inpuText){
        var TextoAcolocar=document.createTextNode(inpuText);
        return TextoAcolocar;
        },
                 //ESTA FUNCION NOS SIRVE PARA BUSCAR MEDIANTE EXPRESIONES REGULARES UN VALOR EN UN TEXTO
      buscar_Match(expresionregular,textoareaw){
            var  buscando_Match=expresionregular.test(textoareaw);
         
            var  buscando_Match_Plano=expresionregular.exec(textoareaw);
        
                if(buscando_Match===true ){
        
        
                        return buscando_Match_Plano[0];
        
                    }
                    else{
                        console.log("no match");
                    }
                    },
                  //ESTA FUNCION NOS SIRVE PARA LIMPIAR LOS ''-'' EN UNA CADENA DE TEXTO  
 limpiar(data){
    var signos=["-","*","_"]
    var signos_rango=signos.length;
    var signos_macht=/(\-)/.test(data);
    if(signos_macht){
        var nuevo_dato=data.replace(/(\-)/g," ");
        return nuevo_dato;
    }else{
        return data;
    }
       

   
},
                //ESTA FUNCION NOS SIRVE PARA CALCULAR EL NUMERO DE NOCHES ENTRE DOS FECHAS Y CALCULAR CUANTO DINERO LES TOCA POR CADA PASAJEROS
                //DATOS PASADOS POR PARAMETRO  29OCT-30OCT 1 54
                // fechaData = 29OCT-30OCT
                //numerodeP = (NUMERO DE PASAJEROS) 1 
                //TOTAL = (CANTIDAD DE DINERO) 54
                //IMPORTATE A RECORDAR ES QUE EL RETORNO NO SON EL NUMERO DE NOCHES SI NO EL CALCULO INDICADO EN LA PRIMERA LINEA
numeronoches(fechaData,numerodeP,total){

    var array_fechas=[];
    array_fechas["JAN"]="01";
    array_fechas["FEB"]="02";
    array_fechas["MAR"]="03";
    array_fechas["APR"]="04";
    array_fechas["MAY"]="05";
    array_fechas["JUN"]="06";
    array_fechas["JUL"]="07";
    array_fechas["AUG"]="08";
    array_fechas["SEP"]="09";
    array_fechas["OCT"]="10";
    array_fechas["NOV"]="11";
    array_fechas["DEC"]="12";

var fechaYEAR=new	Date().getFullYear();

var fechasNumeros=fechaData.match(/\d{2}(?=\w{3})/g);
var fechasLetras=fechaData.match(/(?<=\d{2})\w{3}/g);
var op1=array_fechas[fechasLetras[0]]+"/"+fechasNumeros[0]+"/"+fechaYEAR;

//?FECHAS ASOCIATIVAS--INICIO


var fecha2 =array_fechas[fechasLetras[0]]+"/"+fechasNumeros[0]+"/"+fechaYEAR;
var fecha1 = array_fechas[fechasLetras[1]]+"/"+fechasNumeros[1]+"/"+fechaYEAR;
var diferencia =  Math.floor(( Date.parse(fecha1) - Date.parse(fecha2) ) / 86400000);


if(diferencia < 0){
diferencia = diferencia*(-1);

}
console.log( "numero de  noches "+ diferencia );
numerodeP=parseInt(numerodeP);
var total_Deverdad=(total/numerodeP)/diferencia;

return total_Deverdad

},
// ESTA FUNCION NOS SIRVE PARA TRANSFORMAR UNA FECHA EN EL FORMATO 10/12/2020 EN 10DEC QUE NORMALMENTE ES LA QUE UTILIZA AMADEUS EN LOS RMS
formatoFecha(inputFecha){
    var arrayFechas_Letras=[];
      arrayFechas_Letras["01"]="JAN";
      arrayFechas_Letras["02"]="FEB";
      arrayFechas_Letras["03"]="MAR";
      arrayFechas_Letras["04"]="APR";
      arrayFechas_Letras["05"]="MAY";
      arrayFechas_Letras["06"]="JUN";
      arrayFechas_Letras["07"]="JUL";
      arrayFechas_Letras["08"]="AUG";
      arrayFechas_Letras["09"]="SEP";
      arrayFechas_Letras["10"]="OCT";
      arrayFechas_Letras["11"]="NOV";
      arrayFechas_Letras["12"]="DEC";
      var parte1=this.buscar_Match(/\d{2}(?=\/\d{2}\/)/,inputFecha);
      var parte2=/(?<=\d{2}\/)\d{2}(?=\/\d{4})/.exec(inputFecha);
      var    parte2Text=parte2[0].toUpperCase();
      var parte3=this.buscar_Match(/(?<=\/\d{2}\/)\d{4}/,inputFecha);
      var fecha_final=parte1+arrayFechas_Letras[parte2Text];
      return fecha_final;
  
  }
}
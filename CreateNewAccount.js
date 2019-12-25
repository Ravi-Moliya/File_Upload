$(document).ready(function(){

    var FileFlag=false, FileExtFlag=false, FileSizeFlag=false;
    $("#FU_ProductImage").change(function(){

        $("#ProductImageValidate").empty();

        var FileSize = document.getElementById("FU_ProductImage").files[0].size/1024/1024;
        if(document.getElementById("FU_ProductImage").files.length == 0)
        {
            $("#ProductImageValidate").html("Invalid File Size OR No File Selected..!!<br />File Size Must Be Higher Than 0 MB & Lower Than 100 MB..!!");
            FileFlag=false;
            document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
        }
        else{
            FileFlag=true;

            var extension = document.getElementById("FU_ProductImage").value.split('.').pop().toLowerCase();
            var validFileExtensions = ['jpeg', 'jpg', 'png', 'bmp'];
            if ($.inArray(extension, validFileExtensions) == -1) {
                $("#ProductImageValidate").html("Only .jpeg,.jpg,.png or .bmp files are acceptable..!!");
                FileExtFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            }
            else {
                FileExtFlag = true;
            }

            if(FileSize>100)
            {
                $("#ProductImageValidate").html("Invalid File Size OR No File Selected..!!<br />File Size Must Be Higher Than 0 MB & Lower Than 100 MB..!!");
                FileSizeFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            }
            else{
                FileSizeFlag=true;
            }
        }

        if(FileExtFlag==true && FileSizeFlag==true && FileFlag==true){
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("ImgProductDisplayPic").src = e.target.result;
            };
            reader.readAsDataURL(document.getElementById("FU_ProductImage").files[0]);
        }
        else{
            document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
        }
    });


    
    var $FNameLNameRegEx = /^([a-zA-Z]{2,20})$/;
    var $PasswordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
    var $EmailIdRegEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,10})(\]?)$/;
    var $ConNoRegEx = /^([0-9]{10})$/;

    var FNameFlag = false, LNameFlag = false, EmailIdFlag = false, ContactNoFlag = false, PasswordFlag = false;
                                                
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace.
    specialKeys.push(9); //Tab.
    specialKeys.push(46); //Delete.
    specialKeys.push(16); //Shift.
    specialKeys.push(20); //Caps Lock.
    specialKeys.push(37); //Right Arrow.
    specialKeys.push(39); //Left Arrow.

    $(document).keydown(function(event){
        if(event.keyCode==123){
            alert("THis Function Not Allow For Yhis Website.");
            return false;
        }
        else if (event.ctrlKey && event.shiftKey && event.keyCode==73 || event.ctrlKey && event.shiftKey && event.keyCode==74 || event.ctrlKey && event.shiftKey && event.keyCode==75 || event.ctrlKey && event.shiftKey && event.keyCode==67){        
            alert("THis Function Not Allow For Yhis Website.");     
            return false;
        }
        else if(event.ctrlKey && event.keyCode==85){
            alert("THis Function Not Allow For Yhis Website.");
            return false;
        }
        //123 => F12
        //73 => ctrl + shift + I => Toggle Tools.
        //74 => ctrl + shift + J => Browser Console.
        //75 => ctrl + shift + K => Web Console.
        //67 => ctrl + shift + C => Inspector
        //67 => ctrl + U =>Page Source
    });

    function disableselect(e){
        return true;
    }
    function reEnable(){
        return true;
    }
    document.onselectstart=new Function("return false")
    if(window.sidebar){
        document.onmousedown=disableselect
        document.onclick=reEnable
    }

    $(document).on("contextmenu",function(e){ 
        alert("THis Function Not Allow For Yhis Website.");       
       e.preventDefault();
    });


    $("#FName").bind("keypress",function(e){
       
        var keycode = e.which ? e.which : e.keycode
        var ret = ((keycode>=65 && keycode<=90)||(keycode>=97 && keycode<=122)||(specialKeys.indexOf(keycode)!=-1));
        $("#FNameValidate").html(ret ? "" : "(*)Invalid input....");
        return ret;
    });

    $("#LName").bind("keypress",function(e){

        var keycode = e.which ? e.which : e.keycode;
        var ret = ((keycode>=65 && keycode<=90)||(keycode>=97 && keycode<=122)||(specialKeys.indexOf(keycode)!=-1));
        $("#LNameValidate").html(ret ? "" : "(*)Invalid input....");
        return ret;
    });

    $("#ContactNo").bind("keypress",function(e){

        var keycode = e.which ? e.which : e.keycode;
        var ret = ((keycode>=48 && keycode<=57)||(specialKeys.indexOf(keycode)!=-1));
        $("#ContactNoValidate").html(ret ? "" : "(*)Invalid input....");
        return ret;
    });


    $("#FName").bind("blur",function(){
        
        $("#FNameValidate").empty();
        if($("#FName").val()=="")
        {
            $("#FNameValidate").html("(*)First Name is required....");
        }
        else
        {
            if($("#FName").val().match($FNameLNameRegEx))
            {
                FNameFlag = true;
            }
            else
            {
                $("#FNameValidate").html("(*)Invalid input....");
            }
        }

    });

    $("#LName").bind("blur",function(){

        $("#LNameValidate").empty();
        if($("#LName").val()=="")
        {
            $("#LNameValidate").html("(*)Last Name is required....");
        }
        else
        {
            if($("#LName").val().match($FNameLNameRegEx))
            {
                LNameFlag = true;
            }
            else
            {
                $("#LNameValidate").html("(*)Invalid input....");
            }
        }

    });

    $("#ContactNo").bind("blur",function(){

        $("#ContactNoValidate").empty();
        if($("#ContactNo").val()=="")
        {
            $("#ContactNoValidate").html("(*)Contact No is required....");
        }
        else
        {
            if($("#ContactNo").val().match($ConNoRegEx))
            {
                ContactNoFlag = true;
            }
            else
            {
                $("#ContactNoValidate").html("(*)Invalid input....");
            }
        }

    });



    $("#EmailId").bind("blur",function(){

        $("#EmailIdValidate").empty();
        if($("#EmailId").val()=="")
        {
            $("#EmailIdValidate").html("(*)Email Id is required....");
        }
        else
        {
            if($("#EmailId").val().match($EmailIdRegEx))
            {
                EmailIDFlag = true;
            }
            else
            {
                $("#EmailIDValidate").html("(*)Invalid input....");
            }
        }

    });

    


    $("#Password").bind("blur",function(){

        $("#PasswordValidate").empty();
        if($("#Password").val()=="")
        {
            $("#PasswordValidate").html("(*)Password is required....");
        }
        else
        {
            if($("#Password").val().match($PasswordRegEx))
            {
                PasswordFlag = true;
            }
            else
            {
                $("#PasswordValidate").html("(*)Invalid input....");
            }
        }

    });

    $("#BtnCNA").click(function(){

    if(confirm("Are You Sure...???"))
     {
        $("#FNameValidate").empty();
        if($("#FName").val()=="")
        {
            $("#FNameValidate").html("(*)First Name is required....");
        }
        else
        {
            if($("#FName").val().match($FNameLNameRegEx))
            {
                FNameFlag = true;
            }
            else
            {
                $("#FNameValidate").html("(*)Invalid input....");
            }
        }

        $("#LNameValidate").empty();
        if($("#LName").val()=="")
        {
            $("#LNameValidate").html("(*)Last Name is required....");
        }
        else
        {
            if($("#LName").val().match($FNameLNameRegEx))
            {
                LNameFlag = true;
            }
            else
            {
                $("#LNameValidate").html("(*)Invalid input....");
            }
        }

        $("#ContactNoValidate").empty();
        if($("#ContactNo").val()=="")
        {
            $("#ContactNoValidate").html("(*)Contact No is required....");
        }
        else
        {
            if($("#ContactNo").val().match($ConNoRegEx))
            {
                ContactNoFlag = true;
            }
            else
            {
                $("#ContactNoValidate").html("(*)Invalid input....");
            }
        }


        $("#EmailIdValidate").empty();
        if($("#EmailId").val()=="")
        {
            $("#EmailIdValidate").html("(*)Email Id is required....");
        }
        else
        {
            if($("#EmailId").val().match($EmailIdRegEx))
            {
                EmailIDFlag = true;
            }
            else
            {
                $("#EmailIDValidate").html("(*)Invalid input....");
            }
        }

        $("#PasswordValidate").empty();
        if($("#Password").val()=="")
        {
            $("#PasswordValidate").html("(*)Password is required....");
        }
        else
        {
            if($("#Password").val().match($PasswordRegEx))
            {
                PasswordFlag = true;
            }
            else
            {
                $("#PasswordValidate").html("(*)Invalid input....");
            }
        }


        $("#ProductImageValidate").empty();
        if (document.getElementById("FU_ProductImage").files.length == 0) {
            $("#ProductImageValidate").html("Invalid File Size OR No File Selected..!!<br />File Size Must Be Higher Than 0 MB & Lower Than 100 MB..!!");
            FileFlag = false;
            document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
        }
        else {
            var FileSize = document.getElementById("FU_ProductImage").files[0].size / 1024 / 1024;
            var extension = document.getElementById("FU_ProductImage").value.split('.').pop().toLowerCase();
            var validFileExtensions = ['jpeg', 'jpg', 'png', 'bmp'];
            FileFlag = true;
            if ($.inArray(extension, validFileExtensions) == -1) {
                $("#ProductImageValidate").html("Only .jpeg,.jpg,.png or .bmp files are acceptable..!!");
                FileExtFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            }
            else {
                FileExtFlag = true;
            }
            if (FileSize > 100) {
                $("#ProductImageValidate").html("Invalid File Size OR No File Selected..!!<br />File Size Must Be Higher Than 0 MB & Lower Than 100 MB..!!");
                FileSizeFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            }
            else {
                FileSizeFlag = true;
            }
        }


        if(FNameFlag == false && LNameFlag == false && EmailIdFlag == false && ContactNoFlag == false &&  PasswordFlag == false)
        {
            alert("Invalid Input...");
        }
        else
        {
            var data = null;
            var FileToUpload=document.getElementById("FU_ProductImage").files;

                var FD=new FormData();
                
                for(var i=0;i<FileToUpload.length;i++)
                {
                    FD.append("FileToUpload",FileToUpload[i]);
                }

                var contenttype={
                    headers:{
                        "content-type":"multipart/form-data"
                    }
                };

                axios.post('/FileUpload',FD,contenttype)
                 .then(function (response) {
                    data = response.data;
                    console.log(response.data);
                    alert(data);
                    CreateNewAccount(data,$("#FName").val().trim(),$("#LName").val().trim(),$("#ContactNo").val().trim(),$("#EmailId").val().trim(),$("#Password").val().trim());
                    document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
                    $("#FU_ProductImage").replaceWith($("#FU_ProductImage").val('').clone(true));
                    
                })
                  .catch(function (error) {
                    console.log(error);
                  });

        }
    }
    });
});
function CreateNewAccount(ImageData,FName,LName,ContactNo,EmailId,Password)
{
    $.ajax({
    type:"POST",
    url:"/CreateNewAccount",
    data:{"Image":ImageData,"FName":FName,"LName":LName,"ContactNo":ContactNo,"EmailId":EmailId,"Password":Password},
    datatype:"JSON",
    cached:false,
    success:function(data){

        //alert(data);
        $("#FName").val("");
        $("#LName").val("");
        $("#ContactNo").val("");
        $("#EmailId").val("");
        $("#Password").val("");
    },
    failur:function(){

       alert("Sorry For Inconvience..."); 

    }
    
    });
}
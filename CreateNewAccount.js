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
                                                
    /*Validation Code Put Here By Your Own...*/

    $("#BtnCNA").click(function(){

    if(confirm("Are You Sure...???"))
     {
        
         /*Validation Code Put Here By Your Own...*/
         
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

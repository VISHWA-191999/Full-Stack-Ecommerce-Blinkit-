const verifyEmailTemplate = (name,url) => {
    console.log(name ,url)

    //url is provided because after successfull register user should be redirected to UI i.e frontend

    return `
   <p>Dear ${name}</p>    
<p>Thank you for registering Binkeyit.</p>   
<a href=${url} style="color:black;background :orange;margin-top : 10px,padding:20px,display:block">
    Verify Email
</a>
`


}
export default verifyEmailTemplate;
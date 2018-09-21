<?php

date_default_timezone_set('Etc/UTC');

require './phpmailer/PHPMailerAutoload.php';


$htmlMessage = "<div style='padding: 10%;font-size: 2em; line-height:2em; text-align:center;font-family: Roboto, Helvetica, Arial, sans-serif;color: #333;'>
        <div style='text-align:center;padding:15px;line-height:1em;'><img src='http://".$_SERVER['HTTP_HOST']."/assets/images/logo_black.png' style='max-width:50%;'></div>
        <div style='text-align:center; padding:3pt; text-transform:uppercase;'>Information request from website</div>

        <div style='text-align:center; padding:10%;font-size:smaller;line-height:2em;'>
            <div style='font-weight:bold;'>".$_REQUEST['name']."</div>
            <div>".$_REQUEST['email']."</div>
            <div>".$_REQUEST['message']."</div>
        </div>
        
    </div>";


$txtMessage = "Request from ".$_SERVER['HTTP_HOST']." website.\n
--------------------------------------------------------------------------------\n
\n
Contact info\n
\n
Name:  ".$_REQUEST['name']."\n
Email: ".$_REQUEST['email']."\n
Message: ".$_REQUEST['message']."\n
\n
--------------------------------------------------------------------------------\n
\n
Regards, ".$_SERVER['HTTP_HOST']." mail system";


//Create a new PHPMailer instance
$mail = new PHPMailer;



//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;
//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';
//Set the hostname of the mail server
$mail->Host = "smtp.gmail.com";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 587;
//$mail->SMTPSecure = 'ssl';

$mail->SMTPAuth = true;
$mail->Username = "aplamailer@gmail.com";
$mail->Password = "ikea866240";


$mail->setFrom('aplamailer@gmail.com', 'Aplamailer');
$mail->addReplyTo('aplamailer@gmail.com', 'Aplamailer');


//Set who the message is to be sent to
$mail->addAddress('wham@list.ru', 'John Doe');
$mail->addAddress('hello@apla.io', 'Apla');


$mail->CharSet='utf-8';
//Set the subject line

$mail->Subject = "Request from ".$_SERVER['HTTP_HOST']." website";
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML($htmlMessage );
//Replace the plain text body with one created manually
$mail->AltBody = $htmlMessage ;
//Attach an image file
//$mail->addAttachment('images/phpmailer_mini.png');

//send the message, check for errors
if (!$mail->send()) {
    echo json_encode(array('success'=>0,'error'=>$mail->ErrorInfo));
} else {
    echo json_encode(array('success'=>1));
}


?>
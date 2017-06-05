<?php
/**
 * Created by PhpStorm.
 * User: e.avila
 * Date: 05/06/2017
 * Time: 13:13
 */
include "../vendor/autoload.php";

class Correo
{
    private static function getMailer()
    {
        $transport = Swift_SmtpTransport::newInstance(MAIL_SMTP, MAIL_PORT)
            ->setUsername(MAIL_USER)
            ->setPassword(MAIL_PASSWORD)
        ;

        return Swift_Mailer::newInstance($transport);
    }

    private static function message($subject, $to, $from, $name)
    {
        return Swift_Message::newInstance($subject)
            ->setFrom(array($from => $name))
            ->setTo($to);
    }

    public static function sendEmail($to, $subject, $body, $from, $name)
    {
        $message = self::message($subject, $to, $from, $name);
        $message->setBody($body, 'text/html');

        self::getMailer()->send($message);
    }
}
package sejong.globalbuddy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/review")
public class EmailReportController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/report")
    public String reportPost(@RequestBody Map<String, Long> body) {
        Long postId = body.get("postId");

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("xyukyeong@gmail.com");
        message.setSubject("게시글 신고 알림");
        message.setText("신고된 게시글 ID: " + postId + " 를 확인해주세요.");

        mailSender.send(message);

        return "Reported and Email Sent!";
    }
}
package sejong.globalbuddy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String mainPage() {
        return "main";
    }

    @GetMapping("/data")
    public String dataPage() {
        return "data";
    }

    @GetMapping("/review")
    public String reviewPage() {
        return "review";
    }

    @GetMapping("/team")
    public String teamPage() {
        return "team";
    }

    @GetMapping("/faq")
    public String faqPage() {
        return "faq";
    }
}
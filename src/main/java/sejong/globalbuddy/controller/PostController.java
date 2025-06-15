package sejong.globalbuddy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import sejong.globalbuddy.entity.PostEntity;
import sejong.globalbuddy.repository.PostRepository;

import java.util.List;

@Controller
@RequestMapping("/review")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;

    // 글 목록 페이지
    @GetMapping
    public String list(Model model) {
        List<PostEntity> reviews = postRepository.findAll();
        model.addAttribute("reviews", reviews);
        return "review";
    }

    // 글쓰기 폼 페이지
    @GetMapping("/write")
    public String showWriteForm() {
        return "review_write";
    }

    // 글 등록 처리
    @PostMapping("/write")
    public String savePost(@RequestParam String title,
                           @RequestParam String content,
                           @RequestParam String password) {


        PostEntity post = PostEntity.builder()
                .title(title)
                .content(content)
                .password(password)
                .build();


        postRepository.save(post);

        return "redirect:/review";
    }
}


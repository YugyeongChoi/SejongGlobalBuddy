package sejong.globalbuddy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sejong.globalbuddy.entity.FaqEntity;
import sejong.globalbuddy.service.FaqService;

import java.util.List;

@RestController
@RequestMapping("/api/faqs")
@RequiredArgsConstructor
public class FaqController {

    private final FaqService faqService;

    @GetMapping
    public List<FaqEntity> getFaqs(@RequestParam String lang) {
        return faqService.getAll(lang);
    }

    @PostMapping
    public FaqEntity createFaq(@RequestBody FaqEntity faq) {
        return faqService.create(faq);
    }

    @PutMapping("/{id}")
    public FaqEntity updateFaq(@PathVariable Long id, @RequestBody FaqEntity faq) {
        return faqService.update(id, faq);
    }

    @DeleteMapping("/{id}")
    public void deleteFaq(@PathVariable Long id) {
        faqService.delete(id);
    }
}

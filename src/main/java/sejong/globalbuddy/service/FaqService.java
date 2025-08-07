package sejong.globalbuddy.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sejong.globalbuddy.entity.FaqEntity;
import sejong.globalbuddy.repository.FaqRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FaqService {

    private final FaqRepository faqRepository;

    public List<FaqEntity> getAll(String language) {
        return faqRepository.findByLanguage(language);
    }

    public FaqEntity create(FaqEntity faq) {
        return faqRepository.save(faq);
    }

    public FaqEntity update(Long id, FaqEntity updated) {
        FaqEntity faq = faqRepository.findById(id).orElseThrow();
        faq.setQuestion(updated.getQuestion());
        faq.setAnswer(updated.getAnswer());
        faq.setLanguage(updated.getLanguage());
        return faqRepository.save(faq);
    }

    public void delete(Long id) {
        faqRepository.deleteById(id);
    }
}

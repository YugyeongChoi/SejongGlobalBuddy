package sejong.globalbuddy.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sejong.globalbuddy.dto.PreviewDto;
import sejong.globalbuddy.entity.PreviewEntity;
import sejong.globalbuddy.repository.PreviewRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PreviewService {

    private final PreviewRepository previewRepository;

    public List<Long> getPreviewReviewIds() {
        return previewRepository.findAllByOrderByPositionAsc()
                .stream()
                .map(PreviewEntity::getReviewId)
                .collect(Collectors.toList());
    }

    public void updatePreviewList(List<PreviewDto> previewDtos) {
        previewRepository.deleteAll();

        List<PreviewEntity> previews = previewDtos.stream()
                .map(dto -> PreviewEntity.builder()
                        .reviewId(dto.getReviewId())
                        .position(dto.getPosition())
                        .build())
                .collect(Collectors.toList());

        previewRepository.saveAll(previews);
    }
}

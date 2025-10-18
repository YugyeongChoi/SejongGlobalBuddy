package sejong.globalbuddy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.globalbuddy.dto.PreviewDto;
import sejong.globalbuddy.service.PreviewService;

import java.util.List;

@RestController
@RequestMapping("/api/previews")
@RequiredArgsConstructor
public class PreviewController {

    private final PreviewService previewService;

    @GetMapping
    public ResponseEntity<List<Long>> getPreviewIds() {
        return ResponseEntity.ok(previewService.getPreviewReviewIds());
    }

    @PostMapping
    public ResponseEntity<Void> updatePreviews(@RequestBody List<PreviewDto> previewDtos) {
        previewService.updatePreviewList(previewDtos);
        return ResponseEntity.ok().build();
    }
}

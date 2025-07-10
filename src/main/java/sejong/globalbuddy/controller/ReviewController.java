package sejong.globalbuddy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sejong.globalbuddy.dto.ReviewDto;
import sejong.globalbuddy.entity.PhotoEntity;
import sejong.globalbuddy.entity.ReviewEntity;
import sejong.globalbuddy.repository.ReviewRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping
    public List<ReviewDto> list() {
        return reviewRepository.findAll().stream()
                .map(post -> {
                    ReviewDto dto = new ReviewDto();
                    dto.setId(post.getId());
                    dto.setTitle(post.getTitle());
                    dto.setContent(post.getContent());
                    dto.setPassword(post.getPassword());
                    dto.setNationality(post.getNationality());
                    dto.setGeneration(post.getGeneration());
                    dto.setNickname(post.getNickname());
                    dto.setCreatedTime(post.getCreatedTime());

                    if (post.getPhotos() != null) {
                        dto.setPhotoUrls(
                                post.getPhotos().stream()
                                        .map(PhotoEntity::getUrl)
                                        .collect(Collectors.toList())
                        );
                    }

                    return dto;
                })
                .collect(Collectors.toList());
    }

    @PostMapping(value = "/write", consumes = {"multipart/form-data"})
    public ResponseEntity<?> savePostWithPhoto(
            @RequestPart("review") ReviewDto dto,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {

        try {
            System.out.println("review DTO = " + dto);
            System.out.println("password = " + dto.getPassword());

            if (!dto.getPassword().matches("^\\d{6}$")) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Please enter a 6-digit password!");
            }

            ReviewEntity post = ReviewEntity.builder()
                    .title(dto.getTitle())
                    .content(dto.getContent())
                    .password(dto.getPassword())
                    .nationality(dto.getNationality())
                    .generation(dto.getGeneration())
                    .nickname(dto.getNickname())
                    .build();

            if (images != null && !images.isEmpty()) {
                File uploadPath = new File(uploadDir);
                if (!uploadPath.exists()) {
                    boolean created = uploadPath.mkdirs();
                    if (!created) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Could not create upload directory.");
                    }
                }

                for (MultipartFile image : images) {
                    String originalName = image.getOriginalFilename();
                    if (originalName == null || originalName.isBlank()) continue;

                    String sanitized = originalName.replaceAll("[^a-zA-Z0-9.\\-_]", "_");
                    String fileName = UUID.randomUUID() + "_" + sanitized;
                    Path filePath = Paths.get(uploadDir, fileName);

                    image.transferTo(filePath);

                    PhotoEntity photo = PhotoEntity.builder()
                            .url("/images/" + fileName)
                            .post(post)
                            .build();

                    post.addPhoto(photo);
                }
            }

            reviewRepository.save(post);
            return ResponseEntity.ok("saved");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDto> getPostById(@PathVariable("id") Long id){
        return reviewRepository.findById(id)
                .map(post -> {
                    ReviewDto dto = new ReviewDto();
                    dto.setId(post.getId());
                    dto.setTitle(post.getTitle());
                    dto.setContent(post.getContent());
                    dto.setPassword(post.getPassword());
                    dto.setNationality(post.getNationality());
                    dto.setGeneration(post.getGeneration());
                    dto.setNickname(post.getNickname());
                    dto.setCreatedTime(post.getCreatedTime());

                    if (post.getPhotos() != null) {
                        dto.setPhotoUrls(
                                post.getPhotos().stream()
                                        .map(PhotoEntity::getUrl)
                                        .collect(Collectors.toList())
                        );
                    }

                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") Long id) {
        reviewRepository.deleteById(id);
        return ResponseEntity.ok().body("deleted");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(
            @PathVariable("id") Long id,
            @RequestBody ReviewDto dto) {

        return reviewRepository.findById(id)
                .map(existing -> {
                    if (!existing.getPassword().equals(dto.getPassword())) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body("Incorrect password");
                    }

                    ReviewEntity updatedPost = ReviewEntity.builder()
                            .id(existing.getId())
                            .title(dto.getTitle())
                            .content(dto.getContent())
                            .password(dto.getPassword())
                            .nationality(dto.getNationality())
                            .generation(dto.getGeneration())
                            .nickname(dto.getNickname())
                            .createdTime(existing.getCreatedTime())
                            .build();

                    reviewRepository.save(updatedPost);
                    return ResponseEntity.ok("updated");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 이미지 조회용 핸들러
    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        Path filepath = Paths.get(uploadDir).resolve(filename).normalize();
        Resource resource = new UrlResource(filepath.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        String contentType = Files.probeContentType(filepath);
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}

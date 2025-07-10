package sejong.globalbuddy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
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
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
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
        System.out.println("review 리스트 요청 들어옴");

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

    @PostMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<?> editPost(
            @PathVariable("id") Long id,
            @RequestPart("review") ReviewDto dto,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {

        return reviewRepository.findById(id)
                .map(existing -> {
                    if (!existing.getPassword().equals(dto.getPassword())) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
                    }

                    // 기존 객체에 데이터 업데이트
                    existing.setTitle(dto.getTitle());
                    existing.setContent(dto.getContent());
                    existing.setNationality(dto.getNationality());
                    existing.setGeneration(dto.getGeneration());
                    existing.setNickname(dto.getNickname());

                    // 기존 사진은 삭제하거나 유지 (지금은 무시됨)
                    if (images != null && !images.isEmpty()) {
                        File uploadPath = new File(uploadDir);
                        if (!uploadPath.exists()) uploadPath.mkdirs();

                        for (MultipartFile image : images) {
                            try {
                                String originalName = image.getOriginalFilename();
                                String sanitized = originalName.replaceAll("[^a-zA-Z0-9.\\-_]", "_");
                                String fileName = UUID.randomUUID() + "_" + sanitized;
                                Path filePath = Paths.get(uploadDir, fileName);
                                image.transferTo(filePath.toFile());

                                PhotoEntity photo = PhotoEntity.builder()
                                        .url("/images/" + fileName)
                                        .post(existing) // 기존 객체에 연결
                                        .build();

                                existing.addPhoto(photo);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }

                    reviewRepository.save(existing); // 기존 객체 저장
                    return ResponseEntity.ok("updated");
                })
                .orElse(ResponseEntity.notFound().build());
    }




    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable("filename") String filename) throws IOException {
        String decodedFilename = URLDecoder.decode(filename, StandardCharsets.UTF_8);
        File file = new File(uploadDir, decodedFilename);
        System.out.println("Raw filename from URL: " + filename);
        System.out.println("Decoded filename: " + decodedFilename);

        System.out.println("Trying direct File: " + file.getAbsolutePath());

        if (!file.exists() || !file.canRead()) {
            System.err.println("File not found or unreadable: " + file.getAbsolutePath());
            return ResponseEntity.notFound().build();
        }

        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        String contentType = Files.probeContentType(file.toPath());
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}

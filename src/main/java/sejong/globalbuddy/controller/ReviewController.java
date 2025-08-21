package sejong.globalbuddy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sejong.globalbuddy.dto.ReviewDto;
import sejong.globalbuddy.entity.PhotoEntity;
import sejong.globalbuddy.entity.ReviewEntity;
import sejong.globalbuddy.repository.ReviewRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;

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
                    dto.setNationality(post.getNationality());
                    dto.setGeneration(post.getGeneration());
                    dto.setNickname(post.getNickname());
                    dto.setCreatedTime(post.getCreatedTime());
                    dto.setLikes(post.getLikes());

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
            if (dto.getPassword() == null || !dto.getPassword().matches("^\\d{6}$")) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Please enter a 6-digit password!");
            }


            ReviewEntity post = ReviewEntity.builder()
                    .title(dto.getTitle())
                    .content(dto.getContent())
                    .password(passwordEncoder.encode(dto.getPassword()))
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
                    dto.setNationality(post.getNationality());
                    dto.setGeneration(post.getGeneration());
                    dto.setNickname(post.getNickname());
                    dto.setCreatedTime(post.getCreatedTime());
                    dto.setLikes(post.getLikes());

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
                    existing.setTitle(dto.getTitle());
                    existing.setContent(dto.getContent());
                    existing.setNationality(dto.getNationality());
                    existing.setGeneration(dto.getGeneration());
                    existing.setNickname(dto.getNickname());

                    if (!dto.getPassword().matches("^\\d{6}$")) {
                        return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body("Please enter a 6-digit password!");
                    }

                    existing.setPassword(passwordEncoder.encode(dto.getPassword()));

                    if (images != null && !images.isEmpty()) {
                        // 기존 이미지 삭제
                        List<PhotoEntity> existingPhotos = existing.getPhotos();
                        if (existingPhotos != null && !existingPhotos.isEmpty()) {
                            for (PhotoEntity photo : existingPhotos) {
                                String fileName = Paths.get(photo.getUrl()).getFileName().toString();
                                File file = new File(uploadDir, fileName);
                                if (file.exists()) file.delete();
                            }
                            existingPhotos.clear();
                        }

                        // 새 이미지 저장
                        File uploadPath = new File(uploadDir);
                        if (!uploadPath.exists()) uploadPath.mkdirs();

                        for (MultipartFile image : images) {
                            try {
                                String originalName = image.getOriginalFilename();
                                if (originalName == null || originalName.isBlank()) continue;

                                String sanitized = originalName.replaceAll("[^a-zA-Z0-9.\\-_]", "_");
                                String fileName = UUID.randomUUID() + "_" + sanitized;
                                Path filePath = Paths.get(uploadDir, fileName);
                                image.transferTo(filePath.toFile());

                                PhotoEntity photo = PhotoEntity.builder()
                                        .url("/images/" + fileName)
                                        .post(existing)
                                        .build();

                                existing.addPhoto(photo);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }

                    reviewRepository.save(existing);
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
    @PutMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable("id") Long id) {
        return reviewRepository.findById(id)
                .map(post -> {
                    post.setLikes(post.getLikes() + 1);
                    reviewRepository.save(post);
                    return ResponseEntity.ok(post.getLikes());
                })
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/{id}/verify-password")
    public ResponseEntity<?> verifyPassword(
            @PathVariable("id") Long id,
            @RequestBody Map<String, String> request) {

        String inputPassword = request.get("password");

        return reviewRepository.findById(id)
                .map(review -> {
                    if (passwordEncoder.matches(inputPassword, review.getPassword())) {
                        return ResponseEntity.ok().build();
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

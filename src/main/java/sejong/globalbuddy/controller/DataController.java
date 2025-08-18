package sejong.globalbuddy.controller;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sejong.globalbuddy.service.DataService;
import java.io.IOException;

import java.net.URL;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
@CrossOrigin
public class DataController {

    private final AmazonS3 amazonS3;

    @Value("${cloudflare.r2.bucket}")
    private String bucket;

    private final DataService dataService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("category") String category
    ) throws IOException {
        String fileUrl = dataService.uploadFile(file, category);
        return ResponseEntity.ok(fileUrl);
    }


    @GetMapping
    public ResponseEntity<List<String>> listFiles() {
        return ResponseEntity.ok(dataService.listFiles());
    }

    @DeleteMapping
    public ResponseEntity<?> deleteFile(@RequestParam String filename) {
        dataService.deleteFile(filename);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/download")
    public ResponseEntity<String> generatePresignedDownloadUrl(@RequestParam String key) {
        Date expiration = new Date(System.currentTimeMillis() + 1000 * 60);
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(bucket, key)
                .withMethod(HttpMethod.GET)
                .withExpiration(expiration);

        String fileName = key.substring(key.lastIndexOf("/") + 1)
                .replace("document_", "")
                .replace("presentation_", "");

        request.addRequestParameter("response-content-disposition", "attachment; filename=\"" + fileName + "\"");

        URL url = amazonS3.generatePresignedUrl(request);
        return ResponseEntity.ok(url.toString());
    }

}

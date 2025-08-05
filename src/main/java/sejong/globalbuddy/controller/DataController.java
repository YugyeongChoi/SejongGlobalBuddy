package sejong.globalbuddy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sejong.globalbuddy.service.DataService;
import java.io.IOException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
@CrossOrigin
public class DataController {

    private final DataService dataService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        String fileUrl = dataService.uploadFile(file);
        return ResponseEntity.ok(fileUrl);
    }

    @GetMapping
    public ResponseEntity<List<String>> listFiles() {
        return ResponseEntity.ok(dataService.listFiles());
    }

    @DeleteMapping("/{filename}")
    public ResponseEntity<?> deleteFile(@PathVariable String filename) {
        dataService.deleteFile(filename);
        return ResponseEntity.ok().build();
    }
}

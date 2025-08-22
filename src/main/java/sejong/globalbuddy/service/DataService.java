package sejong.globalbuddy.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DataService {

    private final AmazonS3 amazonS3;

    @Value("${cloudflare.r2.bucket}")
    private String bucket;

    public String uploadFile(MultipartFile file, String category) throws IOException {
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null) throw new IllegalArgumentException("파일 이름이 존재하지 않습니다.");

        String key = category + "/" + originalFileName;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());

        amazonS3.putObject(bucket, key, file.getInputStream(), metadata);

        return amazonS3.getUrl(bucket, key).toString();
    }


    public String uploadFile(MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null) throw new IllegalArgumentException("파일 이름이 존재하지 않습니다.");

        String key = originalFileName;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());

        amazonS3.putObject(bucket, key, file.getInputStream(), metadata);

        return amazonS3.getUrl(bucket, key).toString();
    }


    public List<String> listFiles() {
        ListObjectsV2Result result = amazonS3.listObjectsV2(bucket);
        return result.getObjectSummaries().stream()
                .map(S3ObjectSummary::getKey)
                .collect(Collectors.toList());
    }

    public void deleteFile(String fileName) {
        amazonS3.deleteObject(bucket, fileName);
    }
}

package sejong.globalbuddy.util;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class ImageResizeBatch implements CommandLineRunner {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public void run(String... args) throws Exception {

        File folder = new File(uploadDir);

        if (!folder.exists() || !folder.isDirectory()) {
            System.out.println("업로드 폴더 없음: " + uploadDir);
            return;
        }

        File[] files = folder.listFiles();
        if (files == null || files.length == 0) {
            System.out.println("이미지 없음");
            return;
        }

        System.out.println("이미지 리사이즈 시작");

        int count = 0;

        for (File file : files) {

            if (!file.isFile()) continue;

            String name = file.getName();

            if (!(name.endsWith(".jpg") ||
                    name.endsWith(".jpeg") ||
                    name.endsWith(".png") ||
                    name.endsWith(".webp") ||
                    name.endsWith(".JPG") ||
                    name.endsWith(".JPEG"))) {
                continue;
            }

            System.out.println("processing: " + name);

            try {
                Thumbnails.of(file)
                        .size(1200, 1200)
                        .outputQuality(0.8)
                        .toFile(file);

                count++;

            } catch (Exception e) {
                System.out.println("실패: " + name);
                e.printStackTrace();
            }
        }

        System.out.println("완료, 처리된 이미지: " + count + "개");
    }
}
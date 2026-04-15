package sejong.globalbuddy.util;

import net.coobird.thumbnailator.Thumbnails;

import java.io.File;

public class ImageResizeBatch { //이미지 크기 리사이징

    public static void main(String[] args) throws Exception {

        File folder = new File("/home/ec2-user/images");

        for (File file : folder.listFiles()) {

            if (!file.isFile()) continue;

            System.out.println("processing: " + file.getName());

            Thumbnails.of(file)
                    .size(1200, 1200)
                    .outputQuality(0.8)
                    .toFile(file);
        }

        System.out.println("DONE");
    }
}
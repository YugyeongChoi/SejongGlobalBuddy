package sejong.globalbuddy.dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PreviewDto {
    private Long reviewId;
    private int position;
}

package sejong.globalbuddy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "preview")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PreviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "review_id", nullable = false)
    private Long reviewId;

    @Column(name = "position")
    private int position;
}

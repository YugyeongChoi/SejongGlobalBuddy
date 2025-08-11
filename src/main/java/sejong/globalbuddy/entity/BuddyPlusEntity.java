package sejong.globalbuddy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "buddy_plus")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BuddyPlusEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int team;

    @Column(name = "ko_name", nullable = false, length = 255)
    private String koName;

    @Column(name = "en_name", nullable = false, length = 255)
    private String enName;

    @Column(nullable = false)
    private int bingo;
}

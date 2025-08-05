package sejong.globalbuddy.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "buddy_cross")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BuddyCrossEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "generation", nullable = false)
    private String generation;

    @Column(nullable = false)
    private int score;
}

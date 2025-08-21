package sejong.globalbuddy.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "post")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content", columnDefinition = "text")
    private String content;


    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "created_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdTime;

    @Column(name = "generation")
    private String generation;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "likes", nullable = false)
    private int likes = 0;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PhotoEntity> photos = new ArrayList<>();

    @PrePersist
    protected void onCreateTime() {
        this.createdTime = LocalDateTime.now();
    }

    public void addPhoto(PhotoEntity photo) {
        photos.add(photo);
        photo.setPost(this);
    }

    @Builder
    public ReviewEntity(Long id, String title, String content, String password,
                        LocalDateTime createdTime,
                        String generation, String nationality, String nickname) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.password = password;
        this.createdTime = createdTime != null ? createdTime : LocalDateTime.now();
        this.generation = generation;
        this.nationality = nationality;
        this.nickname = nickname;
    }
}

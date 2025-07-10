package sejong.globalbuddy.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "post")
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "content")
    private String content;

    @Column(name = "password")
    @NotNull
    private String password;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "generation")
    private String generation;

    @Column(name = "nickname", length = 10)
    private String nickname;

    @Column(nullable = false)
    private int likes = 0;

    @Column(name = "created_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdTime;

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

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    @Builder
    public ReviewEntity(Long id, String title, String content, String password,
                        String nationality, String generation, String nickname,
                        LocalDateTime createdTime) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.password = password;
        this.nationality = nationality;
        this.generation = generation;
        this.nickname = nickname;
        this.createdTime = createdTime != null ? createdTime : LocalDateTime.now();
    }


}

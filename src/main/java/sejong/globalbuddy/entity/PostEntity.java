package sejong.globalbuddy.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.ErrorResponse;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 빌더 사용 시 이 패턴 추천
//@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "post")
public class PostEntity {

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
    private String password;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PhotoEntity> photos = new ArrayList<>();

    @PrePersist
    protected void onCreateTime() {
        this.createdTime = LocalDateTime.now();
    }

    // 편의 메서드 (양방향 관계 설정)
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
    public PostEntity(String title, String content, String password) {
        this.title = title;
        this.content = content;
        this.password = password;
        this.createdTime = LocalDateTime.now(); // 직접 설정
    }

}

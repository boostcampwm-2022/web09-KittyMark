import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class DMRoom {
  //채팅방 ID -> mongoDB 메세지 정보에 채팅방 ID를 저장하면..? 별론가
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'participant1', referencedColumnName: 'id' })
  participant1: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'participant2', referencedColumnName: 'id' })
  participant2: User;

  @Column({ nullable: true })
  lastSeenDMOfParticipant1: string;

  @Column({ nullable: true })
  lastSeenDMOfParticipant2: string;
}

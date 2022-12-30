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
  @JoinColumn()
  participant1: number;

  @ManyToOne(() => User)
  @JoinColumn()
  participant2: number;

  @Column()
  lastSeenChatOfParticipant1: string;

  @Column()
  lastSeenChatOfParticipant2: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  industrialField: string;

  @Column({ nullable: true })
  manufacturerName: string;

  @Column({ nullable: true })
  manufacturerType: string;

  @Column({ nullable: true })
  licenseNumber: string;

  @Column({ nullable: true })
  contractNumber: string;

  @Column({ nullable: true })
  branchType: string;

  @Column({ nullable: true })
  province: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  establishedYear: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column('simple-array', { nullable: true })
  gallery: string[];

  @Column({ nullable: true })
  owner: string;
}

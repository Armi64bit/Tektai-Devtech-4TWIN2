import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Challenges, ChallengesDocument } from 'src/schemas/challenges.schema';
import { ChallengeDto } from './challeges.dto';
import { User, UserDocument } from 'src/schemas/user.schema'; // Import User and UserDocument from the user schema

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(Challenges.name) private readonly challengesModel: Model<ChallengesDocument>,  

  ) {}

  async findAll(): Promise<Challenges[]> {
    return this.challengesModel.find().exec();
  }

  async findById(id: string): Promise<Challenges> {
    return this.challengesModel.findById(id).exec();
  }

  async create(challengeDto: ChallengeDto): Promise<Challenges> {
    const createdChallenge = new this.challengesModel(challengeDto);
    return createdChallenge.save();
  }

  async update(id: string, challengeDto: ChallengeDto): Promise<Challenges> {
    return this.challengesModel.findByIdAndUpdate(id, challengeDto, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.challengesModel.findByIdAndDelete(id);
  }

  async getFilteredChallenges(status: string, startDate: Date, deadline: Date): Promise<Challenges[]> {
    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (startDate) {
      query.start_date = { $gte: startDate };
    }

    if (deadline) {
      query.deadline = { $lte: deadline };
    }

    return this.challengesModel.find(query).exec();
  }


  async findByTitle(title: string): Promise<Challenges[]> {
    const regex = new RegExp(title, 'i'); // Case-insensitive search
    return this.challengesModel.find({ title: { $regex: regex } }).exec();
  }
  


  
}

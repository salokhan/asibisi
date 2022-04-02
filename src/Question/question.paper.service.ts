import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionCategoryEntity } from '../model/question-category.entity';
import { Repository } from 'typeorm';
import { QuestionSubCategoryEntity } from '../model/question-sub-category.entity';
import { QuestionSubCategoryResponseObjectDTO, QuestionSubCategoryCreateBodyDTO } from '../DTOs/question.subcategory.dto';
import { QuestionCategoryCreateBodyDTO, QuestionCategoryResponseObjectDTO } from '../DTOs/question.category.dto';
import { OpenQuestionCreateBodyDTO, QuestionCreateBodyDTO, QuestionPaperQuestoinUpdateBodyDTO, QuestionResponseObjectDTO, questionTypeEnum } from '../DTOs/question.dto';
import { QuestionEntity } from '../model/question.entity';
import { QuestionOptionEntity } from '../model/question-option.entity';
import { QuestionPaperCreateBodyDTO, QuestionPaperResponseObjectDTO } from '../DTOs/question.paper.dto';
import { QuestionPaperEntity } from '../model/question-paper.entity';

@Injectable()
export class QuestionPaperService {
  constructor(@InjectRepository(QuestionPaperEntity) private readonly repoQuestionPaper: Repository<QuestionPaperEntity>,
    @InjectRepository(QuestionEntity) private readonly repoQuestion: Repository<QuestionEntity>,
    @InjectRepository(QuestionOptionEntity) private readonly repoQuestionOption: Repository<QuestionOptionEntity>,
    @InjectRepository(QuestionCategoryEntity) private readonly repoQuestionCategory: Repository<QuestionCategoryEntity>,
    @InjectRepository(QuestionSubCategoryEntity) private readonly repoQuestionSubCategory: Repository<QuestionSubCategoryEntity>) {

  }



  public async getQuestionCategoryByCategory(category: string) {
    let result = await (await this.repoQuestionCategory.findOne({ where: { category } }));
    if (result) {
      return result;
    } else {
      return undefined;
    }
  }
  public async getQuestionCategoryByCategoryID(id: string) {
    let result = await (await this.repoQuestionCategory.findOne({ id }));
    if (result) {
      return result;
    } else {
      return undefined;
    }
  }
  public async getQuestionSubCategoryBySubCategory(categoryId: string, subCategory: string) {
    let result = await (await this.repoQuestionSubCategory.find({ where: { questionCategory: categoryId, subCategory: subCategory } }));
    if (result && result.length > 0) {
      return result;
    } else {
      return undefined;
    }
  }

  public async getAllQuestionCategory() {
    let result = await (await this.repoQuestionCategory.find({ where: { isActive: true, isArchived: false } }));
    if (result) {
      return result;
    } else {
      return undefined;
    }
  }

  public async getAllQuestionSubCategory(id: string): Promise<QuestionSubCategoryResponseObjectDTO[]> {
    // let result = await this.repoQuestionCategory.findOne(id, { where: { isActive: true, isArchived: false }, relations: ["questionSubCategory"] });
    let result = await this.repoQuestionSubCategory.find({ where: { isActive: true, isArchived: false, questionCategory:{id} }});
    if (result) {
      return result;
    }
    else {
      throw new NotFoundException({ detail: 'Record with category id not found' });
    }
  }

  public async deleteQuestionCategory(id: string) {
    let cat = await (await this.repoQuestionCategory.findOneOrFail({ id }));
    let result = await this.repoQuestionCategory.update({ id }, { isActive: false, isArchived: true });
    let updateCategory = await this.repoQuestionCategory.findOne(id);
    return updateCategory;
  }
  public async deleteQuestionPaperQuestion(pid: string, id: string) {
    let questionPaper = await this.repoQuestionPaper.findOneOrFail({ where: { id: pid } });
    //if question paper is not verified then allow to delete its question
    if (questionPaper && (!questionPaper.isVerified)) {
      let result = await this.repoQuestion.update({ id }, { isActive: false, isArchived: true });
      let updatedQuestionPaper = await this.repoQuestionPaper.findOne({ where: { id: pid }, relations: ['question', 'question.questionOption'] });
      return updatedQuestionPaper
    }  else {
      throw new ConflictException({ detail: 'Question can not be deleted from a verfied paper' });
    }
    

  }
  public async deleteQuestionPaper(id: string) {
    let questionPaper = await this.repoQuestionPaper.findOneOrFail({ id });
    //if question paper is not verified then allow to delete its question
    if (questionPaper && (!questionPaper.isVerified)) {
      let result = await this.repoQuestionPaper.update({ id }, { isActive: false, isArchived: true });
      let updatedQuestionPaper = await this.repoQuestionPaper.findOne({ where: { id: id }, relations: ['question', 'question.questionOption'] });
      return updatedQuestionPaper;
    } else {
      throw new ConflictException({ detail: 'Verified question paper can not be deleted' });
    }

  }
  public async getAllVerifiedPapers(){
    let questionPaper = await this.repoQuestionPaper.find({ relations: ['question', 'question.questionOption'], where:{isActive: true, isArchived: false, isVerified: true} });
    return questionPaper;
  }
  public async getAllQuestions(id: string) {
    let questionPaper = await this.repoQuestionPaper.findOneOrFail(id, { relations: ['question', 'question.questionOption'], loadEagerRelations: true });
    let questionPaperNew = questionPaper.question.filter((x) => x.isActive == true && x.isArchived == false)
    return questionPaperNew;
  }
  public async verifyQuestionPaper(id: string) {
    let questionPaper = await this.repoQuestionPaper.findOneOrFail(id, { relations: ['question'] });
    if (questionPaper) {
      await this.repoQuestionPaper.update({ id }, { isVerified: true });
      for (let i = 0; i < questionPaper.question.length; i++) {
        let question = questionPaper.question[i];
        question.isVerified = true;
        await this.repoQuestion.update({ id: question.id }, question);
      }
      return this.repoQuestionPaper.findOne(id, { relations: ['question', 'question.questionOption'] });
    }
  }
  public async updateQuestionPaperQuestion(pid, id: string, questionPaperQuestion: QuestionPaperQuestoinUpdateBodyDTO) {
    let questionPaper = await this.repoQuestionPaper.findOneOrFail({ where: { id: pid } });
    //only allow to update the question paper question if the question paper is not verified
    if ((questionPaper && !questionPaper.isVerified) && questionPaperQuestion.questionOptions && questionPaperQuestion.questionOptions.length > 3) {
      let countOfOptionAsAnswer = (questionPaperQuestion.questionOptions.filter((x) => x.isAnswer === true))['length'];
      let questionType = 'none';
      if (countOfOptionAsAnswer > 1) {
        questionType = questionTypeEnum.MULTIOPTION;
      } else {
        questionType = questionTypeEnum.SINGLEOPTION;
      }

      // update question
      await this.repoQuestion.update({ id },
        { questionType: questionType, question: questionPaperQuestion.question, description: questionPaperQuestion.description, createdBy: 'System', lastChangedBy: 'System' }
      );

      //get question with options
      let newQuestionAfterSave = await this.repoQuestion.findOne(id, { relations: ['questionOption'] });
      let questionOptionIdsFromDB = newQuestionAfterSave.questionOption.map(a => a.id);
      let questionOptionIdsFromPutObject = questionPaperQuestion.questionOptions.map(a => a.id);

      const final_result = questionOptionIdsFromDB.every(val => questionOptionIdsFromPutObject.includes(val));

      if (final_result) {
        for (let i = 0; i < questionPaperQuestion.questionOptions.length; i++) {
          let qOption = questionPaperQuestion.questionOptions[i];
          await this.repoQuestionOption.update({ id: qOption.id }, qOption);
        }
        return await await this.repoQuestion.findOne(id, { relations: ['questionOption'] });
      }
    }
    else {
      throw new NotFoundException({ detail: 'Record with question id not found' });
    }

  }
  public async createQuestion(Question: OpenQuestionCreateBodyDTO): Promise<QuestionResponseObjectDTO> {
    Question['createdBy'] = 'System';
    Question['lastChangedBy'] = 'System';
    if (Question.questionOptions.length < 4) {
      //if question options are less then 4
      throw new ConflictException({ detail: 'question option should not be less then 4' });
    } else {
      if (Question.questionOptions.findIndex((x) => x.isAnswer === true) == -1) {
        //if question has no option as answer
        throw new ConflictException({ detail: 'one option should be mentioned as answer' });
      } else {
        let countOfOptionAsAnswer = (Question.questionOptions.filter((x) => x.isAnswer === true))['length'];
        let questionType = 'none';
        if (countOfOptionAsAnswer > 1) {
          questionType = questionTypeEnum.MULTIOPTION;
        } else {
          questionType = questionTypeEnum.SINGLEOPTION;
        }

        let newquestion = new QuestionEntity();
        newquestion['createdBy'] = 'System';
        newquestion['lastChangedBy'] = 'System';
        newquestion.questionType = questionType;
        newquestion.question = Question.question;
        newquestion.id = Question['id'];
        newquestion.isVerified = false;
        newquestion.questionAccess = Question.questionAccess;
        newquestion.difficultyLevel = Question.difficultyLevel;
        newquestion.questionCategoryId = Question.questionCategoryId;
        newquestion.questionSubCategoryId = Question.questionSubCategoryId;
        newquestion.description = Question.description;

        let newQuestionFromDb = await this.repoQuestion.save(newquestion);
        let newQuestionId = newQuestionFromDb.id;
        let newQuestionAfterSave = await this.repoQuestion.findOne(newQuestionId, { relations: ['questionOption'] });

        for (let i = 0; i < Question.questionOptions.length; i++) {
          const questionOption = new QuestionOptionEntity();
          questionOption.option = Question.questionOptions[i].option;
          questionOption.isAnswer = Question.questionOptions[i].isAnswer;
          questionOption['createdBy'] = 'System';
          questionOption['lastChangedBy'] = 'System';
          questionOption['questionId'] = Question['id'];
          newQuestionAfterSave.questionOption.push(await this.repoQuestionOption.save(questionOption));
        }



        return await this.repoQuestion.save(newQuestionAfterSave);
      }
    }

  }

  public async createQuestionPaper(QuestionPaper: QuestionPaperCreateBodyDTO): Promise<QuestionPaperResponseObjectDTO> {
    let newQuestionPaperId = '';
    let newquestionPaper;
    if (QuestionPaper.question.length < 5) {
      throw new ConflictException({ detail: 'question paper should atlest contais 5 questions' });
    }
    else {
      if (QuestionPaper.question.filter(q => q.questionOptions.length < 4).length > 0) {
        //if question options are less then 4
        throw new ConflictException({ detail: 'question option should not be less then 4' });
      } else {
        if (QuestionPaper.question.filter(x => x.questionOptions.findIndex((x) => x.isAnswer === true) == -1).length > 0) {
          //if question has no option as answer
          throw new ConflictException({ detail: 'one option should be mentioned as answer' });
        } else {
          newquestionPaper = new QuestionPaperEntity();
          newquestionPaper.createdBy = 'System';
          newquestionPaper.lastChangedBy = 'System';
          newquestionPaper.questionAccess = QuestionPaper.questionAccess;
          newquestionPaper.difficultyLevel = QuestionPaper.difficultyLevel;
          newquestionPaper.description = QuestionPaper.description;
          newquestionPaper.questionCategoryId = QuestionPaper.questionCategoryId;
          newquestionPaper.questionSubCategoryId = QuestionPaper.questionSubCategoryId;
          newquestionPaper.questionPaper = QuestionPaper.questionPaper;
          let neqQuestionPaperFromDB = await this.repoQuestionPaper.save(newquestionPaper);
          newQuestionPaperId = neqQuestionPaperFromDB['id'];

          let questions = [];
          for (let i = 0; i < QuestionPaper.question.length; i++) {
            let Question = QuestionPaper.question[i];
            let countOfOptionAsAnswer = (Question.questionOptions.filter((x) => x.isAnswer === true))['length'];
            let questionType = 'none';
            if (countOfOptionAsAnswer > 1) {
              questionType = questionTypeEnum.MULTIOPTION;
            } else {
              questionType = questionTypeEnum.SINGLEOPTION;
            }

            let newquestion = new QuestionEntity();
            newquestion['createdBy'] = 'System';
            newquestion['lastChangedBy'] = 'System';
            newquestion.questionType = questionType;
            newquestion.question = Question.question;
            newquestion.id = Question['id'];
            newquestion.isVerified = false;
            newquestion.questionAccess = QuestionPaper.questionAccess;
            newquestion.difficultyLevel = QuestionPaper.difficultyLevel;
            newquestion.questionCategoryId = QuestionPaper.questionCategoryId;
            newquestion.questionSubCategoryId = QuestionPaper.questionSubCategoryId;
            newquestion.description = Question.description;

            let newQuestionFromDb = await this.repoQuestion.save(newquestion);
            let newQuestionId = newQuestionFromDb.id;
            let newQuestionAfterSave = await this.repoQuestion.findOne(newQuestionId, { relations: ['questionOption'] });

            for (let i = 0; i < Question.questionOptions.length; i++) {
              const questionOption = new QuestionOptionEntity();
              questionOption.option = Question.questionOptions[i].option;
              questionOption.isAnswer = Question.questionOptions[i].isAnswer;
              questionOption['createdBy'] = 'System';
              questionOption['lastChangedBy'] = 'System';
              questionOption['questionId'] = Question['id'];
              newQuestionAfterSave.questionOption.push(await this.repoQuestionOption.save(questionOption));
            }



            newQuestionAfterSave.questionPaper = [neqQuestionPaperFromDB];
            questions.push(await this.repoQuestion.save(newQuestionAfterSave));
          }

        }

        // let rere= await this.repoQuestion.find({relations:['questionPaper']});
        let questionPaperRecord = await this.repoQuestionPaper.findOne({ where: { id: newQuestionPaperId }, relations: ['question', 'question.questionOption'] })
        return questionPaperRecord;//new QuestionPaperResponseObjectDTO();
      }
    }


  }

  public async createQuestionCategory(QuestionCategoryResponseObjectDTO: QuestionCategoryCreateBodyDTO): Promise<QuestionCategoryResponseObjectDTO> {
    QuestionCategoryResponseObjectDTO['createdBy'] = 'System';
    QuestionCategoryResponseObjectDTO['lastChangedBy'] = 'System';
    return await this.repoQuestionCategory.save(QuestionCategoryResponseObjectDTO);
  }

  public async createQuestionSubCategory(categoryid: string, QuestionSubCategoryResponseObjectDTO: QuestionSubCategoryCreateBodyDTO): Promise<QuestionSubCategoryResponseObjectDTO> {
    QuestionSubCategoryResponseObjectDTO['createdBy'] = 'System';
    QuestionSubCategoryResponseObjectDTO['lastChangedBy'] = 'System';

    const questionCategory = await this.repoQuestionCategory.findOneOrFail(categoryid, { relations: ["questionSubCategory"] });

    const questionSubCategory = new QuestionSubCategoryEntity();
    questionSubCategory.subCategory = QuestionSubCategoryResponseObjectDTO.subCategory;
    questionSubCategory.createdBy = 'System';
    questionSubCategory.lastChangedBy = 'System';

    const newQuestionSubCategory = await this.repoQuestionSubCategory.save(questionSubCategory);
    questionCategory.questionSubCategory.push(newQuestionSubCategory);
    let abc = await (await this.repoQuestionCategory.save(questionCategory));
    return abc.questionSubCategory.pop();




  }
}

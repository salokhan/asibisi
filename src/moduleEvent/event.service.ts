import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '../model/event.entity';
import { Repository } from 'typeorm';
import { EventCreateBodyDTO, EventTransformObjectDTO, NonVirtualEventCreateBodyDTO, VirtualEventCreateBodyDTO } from '../dtos/event.dto';
import { TagsEntity } from '../model/tags.entity';
import { eventTypeEnum } from '../common/common.enums';
import { configService } from '../config/config.service';
import { map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EventService {


    constructor(@InjectRepository(EventEntity) private readonly repoEvent: Repository<EventEntity>,
        @InjectRepository(TagsEntity) private readonly repoTag: Repository<TagsEntity>,
        private httpService: HttpService
    ) {

    }

    public async getEvents() {
        //let locationInformation = await this.getRequestLocationInformation();
        let events = await this.repoEvent.find();
        return events;
    }

    public async createVirtualEvent(event: VirtualEventCreateBodyDTO) {

        let eventObj = new EventEntity();
        eventObj['createdBy'] = 'System';
        eventObj['lastChangedBy'] = 'System';
        eventObj['eventType'] = eventTypeEnum.VIRTUAL;
        eventObj['eventName'] = event.eventName;
        eventObj['link'] = event.link;
        eventObj['timeZone'] = event.timeZone;
        eventObj['startDate'] = event.startDate;
        eventObj['startTime'] = event.startTime;
        eventObj['endDate'] = event.endDate;
        eventObj['endTime'] = event.endTime;
        eventObj['description'] = event.description;
        eventObj['showContactNumbers'] = event.showContactNumbers;

        let tags = [];
        for (let i = 0; i < event.tags.length; i++) {
            let tag = await this.repoTag.findOne({ where: { tag: event.tags[i] } })
            if (!tag) {
                let tagObj = new TagsEntity();
                tagObj['createdBy'] = 'System';
                tagObj['lastChangedBy'] = 'System';
                tagObj['tag'] = event.tags[i];
                tags.push(await this.repoTag.save(tagObj));
            } else {
                tags.push(tag);
            }
        }

        eventObj.tags = tags;
        let newEvent = await this.repoEvent.save(eventObj);

        return await this.repoEvent.findOne({ where: { id: newEvent.id } });
    }

    public async createNonVirtualEvent(event: NonVirtualEventCreateBodyDTO) {

        let eventObj = new EventEntity();
        eventObj['createdBy'] = 'System';
        eventObj['lastChangedBy'] = 'System';
        eventObj['eventType'] = eventTypeEnum.NONVIRTUAL;
        eventObj['eventName'] = event.eventName;
        eventObj['location'] = event.location;
        eventObj['timeZone'] = event.timeZone;
        eventObj['startDate'] = event.startDate;
        eventObj['startTime'] = event.startTime;
        eventObj['endDate'] = event.endDate;
        eventObj['endTime'] = event.endTime;
        eventObj['description'] = event.description;
        eventObj['showContactNumbers'] = event.showContactNumbers;

        let tags = [];
        for (let i = 0; i < event.tags.length; i++) {
            let tag = await this.repoTag.findOne({ where: { tag: event.tags[i] } })
            if (!tag) {
                let tagObj = new TagsEntity();
                tagObj['createdBy'] = 'System';
                tagObj['lastChangedBy'] = 'System';
                tagObj['tag'] = event.tags[i];
                tags.push(await this.repoTag.save(tagObj));
            } else {
                tags.push(tag);
            }
        }

        eventObj.tags = tags;
        let newEvent = await this.repoEvent.save(eventObj);

        return await this.repoEvent.findOne({ where: { id: newEvent.id } });
    }

    private async getRequestLocationInformation() {
        // return await this.httpService.get('http://ipwho.is/8.8.4.4');
        // return this.httpService.get('http://ipwho.is/8.8.4.4')
        //     .pipe(
        //         map(response => response.data),
        //     );
        return this.httpService.axiosRef.get('http://ipwho.is/8.8.4.4');
    }


}

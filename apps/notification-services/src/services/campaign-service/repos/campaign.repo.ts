import {Campaign} from "@repo/database/database";

interface Topic{
    topic:string
    status:string
}

export class CampaignRepo{
    public async create(info:Topic){
        try {
            const isCampaignExists = await Campaign.findOne({
                // @ts-ignore
                topic:info.topic as string
            });
            if(isCampaignExists){
                return
            }
            const campaign = new Campaign(info);
            await campaign.save()
        } catch (error) {
            
        }
    }


}
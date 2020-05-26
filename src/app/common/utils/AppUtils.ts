import { KvpModel } from '../model/kvp.model';

export class AppUtils
{
    // nombre de jours entre 2 dates
    static diffInDaysBetweenDates(d1: Date, d2: Date)
    {
        if(d1 instanceof Date) 
        {
            if(d1===null || d1===undefined) return -1;
            if(d2===null || d2===undefined) return -1;
    
            console.log('d1', d1);
            console.log('d2', d2);
    
            const WNbJours = d2.getTime() - d1.getTime();
            return Math.ceil(WNbJours/(1000*60*60*24));
        }
        else
        {
            console.log('d1 is not a date', d1);
        }
        return -1;
    }

    static enumElementCount(enumName: any): number {
        let count = 0;
        for(const item in enumName) {
            if(isNaN(Number(item))) count++;
        }
        return count;
    }

    public static keys(enumType: object) {
        const members = Object.keys(enumType);
        return members.filter((x) => Number.isNaN(parseInt(x, 10)));
    }

    public static stringEnumToKeyValue(enumType: object): Array<KvpModel> {
        return AppUtils.keys(enumType)
            .map((key) => {
                return { key, val: enumType[key] };
             });
     }

    public static stringToEnum(enumType: object, val: string): object {
        // return AppUtils.keys(enumType).find( key => enumType[key] === val);

        const entries = Object.entries(enumType);
        for (const entry of entries)
        {
            if(typeof entry[1] ===  'string')
            {
                const ev: string = entry[1];
                if(ev === val)
                    return entry;
            }
        }
        return null;
    }
}

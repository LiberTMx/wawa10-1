import { KvpModel } from '../model/kvp.model';

export class AppUtils
{
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

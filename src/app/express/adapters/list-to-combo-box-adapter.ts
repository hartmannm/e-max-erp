import ComboBoxDataModel from "../miscelaneous/models/combo-box-data.model";

export default class ListToComboBoxAdapter {

  public static adapt(listToAdapt: any[], valueKeyProp: string, exibitionValueKeyProp: string, predicate?: (arg: any) => boolean): ComboBoxDataModel[] {
    return listToAdapt.map(itemList => ({
      value: itemList[valueKeyProp],
      exibitionValue: itemList[exibitionValueKeyProp],
      selected: ListToComboBoxAdapter._setSelected(itemList, predicate)
    })
    );
  }

  private static _setSelected(itemList: any, predicate?: (arg: any) => boolean): boolean {
    if (predicate) {
      return predicate(itemList);
    }
    return false;
  }

}

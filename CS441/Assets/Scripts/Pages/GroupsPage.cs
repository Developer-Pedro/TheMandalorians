using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GroupsPage : PageController
{
	public override HeaderInfo HeaderInfo { get; set; }

	[SerializeField]
	private GameObject GroupListItemPrefab;

	[SerializeField]
	private GameObject ListContainer;

	protected override void BuildPage() {
		foreach (Group group in AccountManager.Self.Account.Groups) {
			GameObject groupListItem = GameObject.Instantiate<GameObject>(GroupListItemPrefab);

			if (groupListItem.GetComponent<GroupListItemController>().Load(group)) {
				groupListItem.transform.SetParent(ListContainer.transform, false);
			} else {
				GameObject.Destroy(groupListItem);
				Debug.LogWarning("WARNING: GroupListItem failed to load.");
			}
		}
	}

	protected override void BuildHeaderInfo() {
		HeaderInfo = new HeaderInfo {
			Visible = true,
			Title = "Groups",
			LeftButtonIsText = true,
			LeftButtonContent = "☰",
			RightButtonIsText = true,
			RightButtonContent = "+"
		};
	}
}

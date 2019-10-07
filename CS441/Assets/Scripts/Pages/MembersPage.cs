using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MembersPage : PageController
{
	public override HeaderInfo HeaderInfo { get; set; }

	[SerializeField]
	private GameObject MemberListItemPrefab;

	[SerializeField]
	private GameObject ListContainer;

	protected override void BuildPage() {
		for (int i = 0; i < 20; i++) {
			GameObject memberListItem = GameObject.Instantiate<GameObject>(MemberListItemPrefab);

			if (memberListItem.GetComponent<MemberListItemController>().Load()) {
				memberListItem.transform.SetParent(ListContainer.transform, false);
			} else {
				GameObject.Destroy(memberListItem);
				Debug.LogWarning("WARNING: MemberListItem failed to load.");
			}
		}
	}

	protected override void BuildHeaderInfo() {
		HeaderInfo = new HeaderInfo {
			Visible = true,
			Title = "[Group Name]",
			LeftButtonIsText = true,
			LeftButtonContent = "<",
			RightButtonIsText = true,
			RightButtonContent = "+"
		};
	}
}

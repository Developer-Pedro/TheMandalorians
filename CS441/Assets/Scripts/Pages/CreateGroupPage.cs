using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CreateGroupPage : PageController
{
	public override HeaderInfo HeaderInfo { get; set; }

	[SerializeField]
	private InputField Groupname;

	protected override void BuildPage() {
		return;
	}

	protected override void BuildHeaderInfo() {
        HeaderInfo = new HeaderInfo {
            Visible = true,
            Title = "New Group",
            LeftButtonIsText = true,
            LeftButtonContent = "<",
            RightButtonIsText = true,
            RightButtonContent = " "
        };
	}

	public void Submit() {
        AccountManager.Self.addGroupName(Groupname.text);
		PageManager.Self.Pop();
        PageManager.Self.Next("Groups Page");
	}

}

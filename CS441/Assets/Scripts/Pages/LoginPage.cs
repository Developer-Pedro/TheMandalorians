using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LoginPage : PageController
{
	public override HeaderInfo HeaderInfo { get; set; }

	[SerializeField]
	private InputField Username;

	[SerializeField]
	private InputField Password;

	protected override void BuildPage() {
		return;
	}

	protected override void BuildHeaderInfo() {
		HeaderInfo = new HeaderInfo {
			Visible = false
		};
	}

	public void Login() {
		if (AccountManager.Self.Login(Username.text, Password.text)) {
			PageManager.Self.Next("Groups Page");
		}
	}

}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HeaderInfo
{
	public bool Visible { get; set; }

	public string Title { get; set; }

	// TODO: Replace all button text with icons
	public bool LeftButtonIsText { get; set; }
	public string LeftButtonContent { get; set; }

	public bool RightButtonIsText { get; set; }
	public string RightButtonContent { get; set; }

}

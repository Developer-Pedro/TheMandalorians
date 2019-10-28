using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class HeaderController : MonoBehaviour
{
	public Button LeftButton;
	public Button RightButton;

	public Text Title;

	private HeaderInfo currentHeader = null;


	// Start is called before the first frame update
	void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

	public void Load(HeaderInfo headerInfo) {
		if (headerInfo.Visible) {
			gameObject.SetActive(true);
			RightButton.interactable = true;
			LeftButton.interactable = true;
			Title.text = headerInfo.Title;
			if (Title.text == "New Group" || Title.text == "[Group Name]")
			{
				RightButton.interactable = false;
			}
			if (Title.text == "Groups")
			{
				LeftButton.interactable = false;
			}
			//LeftButton.onClick += print("hello");

			if (headerInfo.LeftButtonIsText)
				LeftButton.GetComponentInChildren<Text>().text = "    " + headerInfo.LeftButtonContent + "    ";

			if (headerInfo.RightButtonIsText)
				RightButton.GetComponentInChildren<Text>().text = "    " + headerInfo.RightButtonContent + "    ";

		} else {
			gameObject.SetActive(false);
		}

		currentHeader = headerInfo;
	}
    
}

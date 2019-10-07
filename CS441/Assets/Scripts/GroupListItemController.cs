using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GroupListItemController : MonoBehaviour
{
	public Image GroupImage;

	public Text GroupName;

	public GameObject NotificationBox;
	public Text NotificationCount;

	// Start is called before the first frame update
	void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

	public bool Load(Group group) {
		GroupName.text = "  " + group.Name;

		return true;
	}

	public void OpenGroup() {
		PageManager.Self.Next("Members Page");
	}
}

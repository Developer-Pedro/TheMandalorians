using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class PageController : MonoBehaviour
{
	public abstract HeaderInfo HeaderInfo { get; set; }

	public 

	void Awake() {

		BuildPage();
		BuildHeaderInfo();
	}

	// Start is called before the first frame update
	void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

	protected virtual void BuildPage() { }
	protected abstract void BuildHeaderInfo();
}

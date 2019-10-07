using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoSingleton<GameManager>
{
	public string Username { get; set; } = ""; // TODO: Move to AccountManager

	protected override void DerivedAwake() {
		DontDestroyOnLoad(gameObject);

	}

	// Start is called before the first frame update
	void Start()
    {
		PageManager.Self.Start("Login Page");
		//statem
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
